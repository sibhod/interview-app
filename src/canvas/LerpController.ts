import { lerpFloat, lerpHexColor } from 'util/lerp';
import { easeInOutCubic } from 'util/easing';

type BaseLerpControllerProps<T> = {
  ease?: (t: number) => number;
  getDuration: () => number;
  getValue: () => T;
};

export abstract class BaseLerpController<T extends any> {
  protected ease: (t: number) => number;
  protected getDuration: () => number;
  protected getValue: () => T;

  protected elapsed: number = 0;
  protected duration: number = 0.0001;
  protected from: T;
  protected to: T;

  constructor({ ease, getDuration, getValue }: BaseLerpControllerProps<T>) {
    this.ease = ease ?? easeInOutCubic;
    this.getDuration = getDuration;
    this.getValue = getValue;

    this.from = getValue();
    this.to = getValue();
    this.duration = this.getDuration();
  }

  public abstract get current(): T;

  public get progressRatio(): number {
    this.elapsed >= this.duration && this.setNewTarget(this.to);
    return this.elapsed / this.duration;
  }

  public get easedRatio(): number {
    return this.ease(this.progressRatio);
  }

  public tick(delta: number) {
    this.elapsed += delta;
    return this.current;
  }

  protected setNewTarget(prevTo: T) {
    this.from = prevTo;
    this.to = this.getValue();
    this.elapsed -= this.duration;
    this.duration = this.getDuration();
  }
}

export class LerpFloatController extends BaseLerpController<number> {
  static create(props: BaseLerpControllerProps<number>) {
    return new LerpFloatController(props);
  }

  constructor(props: BaseLerpControllerProps<number>) {
    super(props);
  }

  public get current(): number {
    const t = this.easedRatio;
    return lerpFloat(this.from, this.to, t);
  }
}

export class LerpHexColorController extends BaseLerpController<string> {
  static create(props: BaseLerpControllerProps<string>) {
    return new LerpHexColorController(props);
  }

  constructor(props: BaseLerpControllerProps<string>) {
    super(props);
  }

  public get current(): string {
    const t = this.easedRatio;
    return lerpHexColor(this.from, this.to, t);
  }
}
