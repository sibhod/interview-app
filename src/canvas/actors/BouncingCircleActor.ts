import { CANVAS_WIDTH, CANVAS_HEIGHT } from 'constants/layout';
import { clamp } from 'util/clamp';
import { randomRange } from 'util/random';

export class BouncingCircleActor {
  static radiusRange: [number, number] = [10, 25];
  static velocityRange: [number, number] = [10, 75];
  static getRandomRadius() {
    return randomRange(...BouncingCircleActor.radiusRange);
  }
  static getRandomVelocity() {
    return randomRange(...BouncingCircleActor.velocityRange);
  }

  public readonly position: [number, number];
  public readonly radius: number;
  public velocity: number;
  private direction: [number, number];

  constructor() {
    this.radius = BouncingCircleActor.getRandomRadius();
    this.position = [
      randomRange(this.min[0], this.max[0]),
      randomRange(this.min[1], this.max[1]),
    ];
    this.velocity = BouncingCircleActor.getRandomVelocity();

    const angle = randomRange(0, Math.PI * 2);
    this.direction = [Math.cos(angle), Math.sin(angle)];
  }

  private _min: [number, number] = [0, 0];
  private get min() {
    if (!this._min[0]) {
      this._min = [this.radius, this.radius];
    }
    return this._min;
  }

  private _max: [number, number] = [0, 0];
  private get max() {
    if (!this._max[0]) {
      this._max = [CANVAS_WIDTH - this.radius, CANVAS_HEIGHT - this.radius];
    }
    return this._max;
  }

  private clampX(x: number) {
    return clamp(x, this.min[0], this.max[0]);
  }
  private clampY(y: number) {
    return clamp(y, this.min[1], this.max[1]);
  }

  public update(delta: number) {
    const newX = this.position[0] + this.direction[0] * this.velocity * delta;
    const clampedX = this.clampX(newX);

    if (newX === clampedX) {
      this.position[0] = clampedX;
    } else {
      this.direction[0] *= -1;
      const diff = newX - clampedX;
      this.position[0] = clampedX - diff;
    }

    const newY = this.position[1] + this.direction[1] * this.velocity * delta;
    const clampedY = this.clampY(newY);
    if (newY === clampedY) {
      this.position[1] = clampedY;
    } else {
      this.direction[1] *= -1;
      const diff = newY - clampedY;
      this.position[1] = clampedY - diff;
    }

    if (newX !== clampedX || newY !== clampedY) {
      this.velocity = BouncingCircleActor.getRandomVelocity();
    }
  }
}
