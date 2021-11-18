import { RenderScene } from 'canvas/scenes/RenderScene';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/layout';
import { ScenePlayerState } from 'types/ScenePlayerState';

export type CanvasControllerProps = {
  canvas: HTMLCanvasElement;
  scenes?: RenderScene[];
  activeSceneId?: string;
  runOnStart?: boolean;
  onRunStateChange?: (running: boolean) => void;
  state?: ScenePlayerState;
};

export class CanvasController {
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  public readonly bufferCanvas: HTMLCanvasElement;
  public readonly bufferCtx: CanvasRenderingContext2D;
  public readonly scenes: RenderScene[];

  private activeScene: RenderScene | null = null;
  private state?: ScenePlayerState;
  private onRunStateChange?: (running: boolean) => void;
  private frameId: number = 0;
  private running: boolean = false;
  private previousTimestamp: number = 0;

  private isBlurred: boolean = false;
  private isHidden: boolean = false;

  private mouseEnterHandler: (event: MouseEvent) => void =
    this.handleMouseEnter.bind(this);
  private mouseLeaveHandler: (event: MouseEvent) => void =
    this.handleMouseLeave.bind(this);
  private visibilityChangeHandler: () => void =
    this.handleVisibilityChange.bind(this);
  private windowFocusChangeHandler: (event: FocusEvent) => void =
    this.handleWindowFocusChange.bind(this);

  constructor({
    canvas,
    scenes,
    activeSceneId,
    state,
    onRunStateChange,
    runOnStart = true,
  }: CanvasControllerProps) {
    this.canvas = canvas;
    this.state = state;
    this.onRunStateChange = onRunStateChange;

    canvas.addEventListener('mouseenter', this.mouseEnterHandler);
    canvas.addEventListener('mouseleave', this.mouseLeaveHandler);
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    window.addEventListener('focus', this.windowFocusChangeHandler);
    window.addEventListener('blur', this.windowFocusChangeHandler);

    this.ctx = canvas.getContext('2d')!;

    const scale = Math.ceil(window.devicePixelRatio);
    if (scale !== 1) {
      canvas.width = CANVAS_WIDTH * scale;
      canvas.height = CANVAS_HEIGHT * scale;
      canvas.style.width = `${CANVAS_WIDTH}px`;
      canvas.style.height = `${CANVAS_HEIGHT}px`;
      this.ctx.scale(scale, scale);
    }

    const buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    buffer.style.width = canvas.style.width;
    buffer.style.height = canvas.style.height;
    this.bufferCtx = buffer.getContext('2d')!;
    this.bufferCtx.scale(scale, scale);
    this.bufferCanvas = buffer;

    this.scenes = scenes ?? [];
    const layerId = activeSceneId ?? this.scenes[0]?.id;
    layerId && this.setActiveScene(layerId);

    if (runOnStart) {
      this.start();
    }
  }

  public get isRunning() {
    return this.running;
  }

  public setActiveScene(layerId: string) {
    this.activeScene?.stop();
    this.activeScene =
      this.scenes.find((layer) => layer.id === layerId) ?? null;
    this.activeScene?.start();
  }

  public getActiveScene() {
    return this.activeScene;
  }

  public setPlayerState(state: ScenePlayerState) {
    if (state.isPlaying !== this.running) {
      state.isPlaying ? this.start() : this.stop();
    }

    this.state = state;
  }

  public start() {
    if (!this.running && !(this.isBlurred || this.isHidden)) {
      this.running = true;
      this.activeScene?.start();
      this.tick(0);
      this.onRunStateChange?.(this.running);
    }
  }

  public stop() {
    if (this.running) {
      this.activeScene?.stop();
      cancelAnimationFrame(this.frameId);
      this.previousTimestamp = 0;
      this.running = false;
      this.onRunStateChange?.(this.running);
    }
  }

  public tick(timestamp: number) {
    if (!this.running) {
      return;
    }

    const delta = this.previousTimestamp
      ? (timestamp - this.previousTimestamp) *
        0.001 *
        (this.state?.playbackSpeed ?? 1)
      : 0;
    this.previousTimestamp = timestamp;

    if (this.activeScene) {
      this.activeScene.render(delta, this.ctx, this.bufferCtx);
    }

    this.frameId = requestAnimationFrame(this.tick.bind(this));
  }

  public dispose() {
    this.running = false;
    cancelAnimationFrame(this.frameId);
    this.scenes.forEach((layer) => layer.dispose());

    this.canvas.removeEventListener('mouseenter', this.mouseEnterHandler);
    this.canvas.removeEventListener('mouseleave', this.mouseLeaveHandler);
    document.removeEventListener(
      'visibilitychange',
      this.visibilityChangeHandler
    );
    window.removeEventListener('focus', this.windowFocusChangeHandler);
    window.removeEventListener('blur', this.windowFocusChangeHandler);
  }

  private resumeIfPlaying() {
    if (this.state?.isPlaying) {
      this.start();
    }
  }

  private handleMouseEnter(event: MouseEvent) {
    //this.running && this.stop();
  }

  private handleMouseLeave(event: MouseEvent) {
    // this.start();
  }

  private handleVisibilityChange() {
    this.isHidden = document.visibilityState === 'hidden';
    this.isHidden ? this.stop() : this.resumeIfPlaying();
  }

  private handleWindowFocusChange(event: FocusEvent) {
    this.isBlurred = event.type === 'blur';
    this.isBlurred ? this.stop() : this.resumeIfPlaying();
  }
}
