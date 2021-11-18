import {
  BaseLerpController,
  LerpFloatController,
  LerpHexColorController,
} from 'canvas/LerpController';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/layout';
import { drawCircle } from 'canvas/drawing/drawCircle';
import { randomElement, randomRange, weightedRange } from 'util/random';
import {
  TEAL,
  PURPLE,
  YELLOW,
  RED,
  SAPPHIRE,
  KHAKI_BLUE,
  OFF_WHITE,
} from 'constants/colors';
import { hexToRgba } from 'util/color';
import {
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce,
} from 'util/easing';

type LerpMap = {
  positionX: LerpFloatController;
  positionY: LerpFloatController;
  radius: LerpFloatController;
  lineWidth: LerpFloatController;
  fill: LerpHexColorController;
  fillAlpha: LerpFloatController;
  stroke: LerpHexColorController;
  strokeAlpha: LerpFloatController;
};

const colors = [
  TEAL,
  PURPLE,
  // YELLOW,
  RED,
  SAPPHIRE,
  KHAKI_BLUE,
  '#4c3957',
  '#6b5ca5',
  // OFF_WHITE,
];
const eases = [
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  // easeInBack,
  // easeOutBack,
  // easeInOutBack,
  // easeInElastic,
  // easeOutElastic,
  // easeInOutElastic,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce,
];

const getRandomEase = () => randomElement(eases);
const getDefaultDuration = () => randomRange(0.85, 16);
const getRandomColor = () => randomElement(colors);
const makeLerp = (getValue: () => number) =>
  LerpFloatController.create({
    ease: getRandomEase(),
    getDuration: getDefaultDuration,
    getValue,
  });
const makeColorLerp = (getDuration?: () => number) =>
  LerpHexColorController.create({
    ease: getRandomEase(),
    getDuration: getDuration ?? getDefaultDuration,
    getValue: getRandomColor,
  });

const margin = 124;
const rangeX = [-margin, CANVAS_WIDTH + margin] as [number, number];
const rangeY = [-margin, CANVAS_HEIGHT + margin] as [number, number];

export class LerpingCircleActor {
  private lerpers: LerpMap;
  private lerperList: BaseLerpController<any>[];
  constructor() {
    this.lerpers = {
      positionX: makeLerp(() => randomRange(rangeX)),
      positionY: makeLerp(() => randomRange(rangeY)),
      radius: makeLerp(() => weightedRange(5, 75, easeInOutExpo)),
      lineWidth: makeLerp(() => weightedRange(1, 90, easeInOutExpo)),
      // lineWidth: makeLerp(() => 1 + easeInOutExpo(randomRange(0, 1)) * 95),
      //
      fill: makeColorLerp(),
      fillAlpha: makeLerp(() => randomRange(0.35, 0.95)),
      //
      stroke: makeColorLerp(),
      strokeAlpha: makeLerp(() => randomRange(0.15, 0.25)),
    };

    this.lerperList = Object.values(this.lerpers);
  }

  public render(delta: number, ctx: CanvasRenderingContext2D) {
    this.lerperList.forEach((l) => l.tick(delta));

    ctx.fillStyle = hexToRgba(
      this.lerpers.fill.current,
      this.lerpers.fillAlpha.current
    );
    ctx.strokeStyle = hexToRgba(
      this.lerpers.stroke.current,
      this.lerpers.strokeAlpha.current
    );
    ctx.lineWidth = this.lerpers.lineWidth.current;

    const position = [
      this.lerpers.positionX.current,
      this.lerpers.positionY.current,
    ] as [number, number];

    drawCircle({ ctx, position, radius: this.lerpers.radius.current }).fill();
  }
}
