import { RenderScene } from 'canvas/scenes/RenderScene';
import { drawCircle } from 'canvas/drawing/drawCircle';
import { OFF_WHITE, PURPLE, RED } from 'constants/colors';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from 'constants/layout';
import { BouncingCircleActor } from 'canvas/actors/BouncingCircleActor';
import { drawMeasuredConnection } from 'canvas/drawing/drawMeasuredConnection';

const circleCount = 40;
const FONT = 'bolder 10px Dank Mono';

export class MeasureDistanceScene extends RenderScene {
  static readonly Id = 'MeasureDistanceScene';

  private circles: BouncingCircleActor[] = [];

  constructor() {
    super(MeasureDistanceScene.Id);
  }

  public start() {
    if (!this.circles.length) {
      for (let i = 0; i < circleCount; i++) {
        this.circles.push(new BouncingCircleActor());
      }
    }
  }

  public stop() {}

  public render(
    delta: number,
    ctx: CanvasRenderingContext2D,
    buffer: CanvasRenderingContext2D
  ) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    var gradient = ctx.createRadialGradient(
      400,
      100,
      500,
      //
      600,
      30,
      280
    );

    // Add three color stops
    gradient.addColorStop(0.005, '#fff08fa3');
    gradient.addColorStop(0.4, '#53f0da54');
    gradient.addColorStop(0.825, '#94bbe953');

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    buffer.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = RED;
    ctx.strokeStyle = RED;

    let prevCircle: BouncingCircleActor | undefined;
    this.circles.forEach((circle) => {
      circle.update(delta);
      buffer.strokeStyle = 'transparent';
      buffer.fillStyle = RED;
      drawCircle({
        ctx: buffer,
        position: circle.position,
        radius: circle.radius,
      }).fill();

      if (prevCircle) {
        drawMeasuredConnection({
          ctx,
          from: prevCircle.position,
          to: circle.position,
          setLineStyle: (ctx) => {
            ctx.lineWidth = 1;
            ctx.strokeStyle = PURPLE;
            ctx.setLineDash([0, 1, 1]);
          },
          setLabelStyle: (ctx) => {
            ctx.lineWidth = 0;
            ctx.setLineDash([]);

            ctx.fillStyle = PURPLE;
          },
          setTextStyle: (ctx) => {
            ctx.fillStyle = OFF_WHITE;
            ctx.textAlign = 'center';
            ctx.font = FONT;
          },
        });
      }

      prevCircle = circle;
    });

    ctx.drawImage(buffer.canvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  public dispose() {
    this.circles = [];
  }
}
