import { RenderScene } from 'canvas/scenes/RenderScene';
import { LerpHexColorController } from 'canvas/LerpController';
import { DARK_GREY, OFF_WHITE, KHAKI_BLUE } from 'constants/colors';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from 'constants/layout';
import { LerpingCircleActor } from 'canvas/actors/LerpingCircleActor';
import { randomElement, randomRange } from 'util/random';

const altColors = [
  KHAKI_BLUE,
  DARK_GREY,
  OFF_WHITE,
  '#006466',
  '#065a60',
  '#0b525b',
  '#144552',
  '#1b3a4b',
  '#212f45',
  '#272640',
  '#312244',
  '#3e1f47',
  '#4d194d',
];
const getRandomColor = () => randomElement(altColors);
const makeColorLerp = (getDuration?: () => number) =>
  LerpHexColorController.create({
    getDuration: () => randomRange(2, 12),
    getValue: getRandomColor,
  });

const count = 65;

export class LerpingScene extends RenderScene {
  static readonly Id = 'LerpingScene';

  private actors: LerpingCircleActor[];
  private fillLerper = makeColorLerp();
  constructor() {
    super(LerpingScene.Id);

    this.actors = [];
    for (let i = 0; i < count; i++) {
      this.actors.push(new LerpingCircleActor());
    }
  }

  public start() {}

  public stop() {}

  public render(delta: number, ctx: CanvasRenderingContext2D) {
    const operation = ctx.globalCompositeOperation;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.fillLerper.tick(delta);
    ctx.fillStyle = this.fillLerper.current;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.globalCompositeOperation = 'exclusion';

    this.actors.forEach((a) => a.render(delta, ctx));
    ctx.globalCompositeOperation = operation;
  }

  public dispose() {}
}
