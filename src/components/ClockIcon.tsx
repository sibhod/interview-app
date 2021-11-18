import { keyframes } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PlaybackSpeed, ScenePlayerState } from 'types/ScenePlayerState';

const defaultAnimationDuration = 20;

const getAnimationDuration = (speed: PlaybackSpeed, scalar: number = 1) =>
  (defaultAnimationDuration * scalar) / speed;

const hourHandPath =
  'M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 1.882a6.118 6.118 0 1 1 0 12.236A6.118 6.118 0 0 1 8 1.882ZM8 2c.54.002.977.393.983.877v.016l.009 5.222c-.002.49-.447.887-.992.885-.54-.002-.977-.393-.983-.877v-.016l-.009-5.222c.002-.49.447-.887.992-.885Z';
const minuteHandPath =
  'M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 1.882a6.118 6.118 0 1 1 0 12.236A6.118 6.118 0 0 1 8 1.882ZM8 4c.54.002.977.393.983.877v.016l.009 3.222c-.002.49-.447.887-.992.885-.54-.002-.977-.393-.983-.877v-.016l-.009-3.222c.002-.49.447-.887.992-.885Z';

const rotate = keyframes`
  0% { transform: rotateZ(0); }
  100% { transform: rotateZ(360deg); }
`;

const HandPath = styled.path<{
  isPlaying: boolean;
}>(
  (props) => css`
    fill: currentColor;
    transform-origin: center;
    animation-name: ${rotate};
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: ${props.isPlaying ? 'running' : 'paused'};
    animation-duration: 0s;
  `
);

type Props = {
  state: ScenePlayerState;
  isHovering?: boolean;
};

export const ClockIcon = ({
  isHovering,
  state: { isControllerRunning, isPlaying, playbackSpeed },
}: Props) => {
  return (
    <span>
      <svg viewBox='0 0 16 16' width={24} height={24}>
        <g>
          <HandPath
            d={hourHandPath}
            isPlaying={isPlaying && isControllerRunning && !!isHovering}
            style={{
              animationDuration: `${getAnimationDuration(
                playbackSpeed,
                1 / 6
              )}s`,
            }}
          />
          <HandPath
            d={minuteHandPath}
            isPlaying={isPlaying && isControllerRunning && !!isHovering}
            style={{
              animationDuration: `${getAnimationDuration(playbackSpeed)}s`,
            }}
          />
        </g>
      </svg>
    </span>
  );
};
