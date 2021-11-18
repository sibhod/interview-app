export enum PlaybackSpeed {
  VERY_SLOW = 0.25,
  SLOW = 0.5,
  NORMAL = 1,
  FAST = 2,
  VERY_FAST = 4,
}

const speedList = [
  PlaybackSpeed.VERY_SLOW,
  PlaybackSpeed.SLOW,
  PlaybackSpeed.NORMAL,
  PlaybackSpeed.FAST,
  PlaybackSpeed.VERY_FAST,
];
export const getNextPlaybackSpeed = (speed: PlaybackSpeed) =>
  speedList[(speedList.indexOf(speed) + 1) % speedList.length];

export type ScenePlayerState = {
  isControllerRunning: boolean;
  isPlaying: boolean;
  playbackSpeed: PlaybackSpeed;
};
