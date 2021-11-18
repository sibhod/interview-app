export abstract class RenderScene {
  static readonly Id: string = 'RenderScene';
  constructor(public readonly id: string) {
    this.id = id;
  }

  abstract start(): void;
  abstract stop(): void;
  abstract render(
    delta: number,
    ctx: CanvasRenderingContext2D,
    buffer: CanvasRenderingContext2D
  ): void;
  abstract dispose(): void;
}
