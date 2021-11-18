type Props = {
  ctx: CanvasRenderingContext2D;
  position: [number, number];
  radius: number;
};

export const drawCircle = ({ ctx, position: [x, y], radius }: Props) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  return ctx;
};
