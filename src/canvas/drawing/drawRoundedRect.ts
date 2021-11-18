type DrawRoundedRectProps = {
  ctx: CanvasRenderingContext2D;
  position: [number, number];
  width: number;
  height: number;
  radius: number;
};

export const drawRoundedRect = ({
  ctx,
  position: [x, y],
  width,
  height,
  radius = 10,
}: DrawRoundedRectProps) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  return ctx;
};
