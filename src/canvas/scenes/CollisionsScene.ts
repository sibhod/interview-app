import { RenderScene } from 'canvas/scenes/RenderScene';
import { DARK_GREY, TEAL } from 'constants/colors';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from 'constants/layout';

export class CollisionsScene extends RenderScene {
  static readonly Id = 'CollisionsScene';

  constructor() {
    super(CollisionsScene.Id);
  }

  public start() {}

  public stop() {}

  public render(
    delta: number,
    ctx: CanvasRenderingContext2D,
    buffer: CanvasRenderingContext2D
  ) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = DARK_GREY;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  public dispose() {}
}
