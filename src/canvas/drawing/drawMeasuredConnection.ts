import { average, distance } from 'util/vector';
import { drawRoundedRect } from 'canvas/drawing/drawRoundedRect';

type DrawConnectionProps = {
  ctx: CanvasRenderingContext2D;
  from: [number, number];
  to: [number, number];
  setLineStyle?: (ctx: CanvasRenderingContext2D) => void;
  setTextStyle?: (ctx: CanvasRenderingContext2D) => void;
  setLabelStyle?: (ctx: CanvasRenderingContext2D) => void;
};

export const drawMeasuredConnection = ({
  ctx,
  from,
  to,
  setLineStyle,
  setLabelStyle,
  setTextStyle,
}: DrawConnectionProps) => {
  const center = average([from, to]);

  setLineStyle?.(ctx);
  ctx.beginPath();
  ctx.moveTo(center[0], center[1]);
  ctx.lineTo(from[0], from[1]);
  ctx.moveTo(center[0], center[1]);
  ctx.lineTo(to[0], to[1]);
  ctx.stroke();

  const distString = distance([from, to]).toFixed(1) + 'px';

  const width = 50;
  const height = 15;

  const labelPos: [number, number] = [
    center[0] - width / 2,
    center[1] - height / 2,
  ];
  setLabelStyle?.(ctx);
  drawRoundedRect({
    ctx,
    position: labelPos,
    width,
    height,
    radius: 4,
  }).fill();

  setTextStyle?.(ctx);
  ctx.fillText(distString, center[0], center[1] + 3);
};
