import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { BAHAMA_BLUE, BLUE, DARK_PURPLE, OFF_WHITE } from 'constants/colors';
import { BOX_SHADOW } from 'constants/styles';

import { CircleButton } from 'components/CircleButton';
import { hexToRgba } from 'util/color';
import { ScenePlayerState } from 'types/ScenePlayerState';
import { ClockIcon } from 'components/ClockIcon';
import { translate } from 'util/vector';
import { useState } from 'react';

const Container = styled.div`
  opacity: 0.25;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 700px;
  height: 140px;
  padding-bottom: 10px;
  transition: opacity 0.5s ease;
  gap: 8px;
  &:hover {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  --color: ${hexToRgba(OFF_WHITE, 0.75)};
  background-color: ${hexToRgba(OFF_WHITE, 0.75)};
  box-shadow: ${BOX_SHADOW};
  border-radius: 22px;
  border: solid 1px var(--color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayPauseIconContainer = styled.div<{ isPlaying: boolean }>((props) =>
  props.isPlaying
    ? `
    transform: none;
    width: 14px;
    height: 14px;
  `
    : `
  transform: translateX(1px);
`
);

type Props = {
  onPlaybackSpeedClick: () => void;
  onPlayClick: () => void;
  playerState: ScenePlayerState;
};

export const PlayerControls = ({
  onPlaybackSpeedClick,
  onPlayClick,
  playerState,
}: Props) => {
  const { isPlaying } = playerState;
  const [isHoveringSpeedButton, setIsHoveringSpeedButton] =
    useState<boolean>(false);
  return (
    <Container>
      <CircleButton
        backgroundColor={OFF_WHITE}
        color={BLUE}
        size={40}
        stroke={2}
      />
      <CircleButton
        backgroundColor={OFF_WHITE}
        color={BLUE}
        onClick={onPlayClick}
        size={40}
        stroke={2}
      >
        <PlayPauseIconContainer isPlaying={isPlaying}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </PlayPauseIconContainer>
      </CircleButton>
      <CircleButton
        backgroundColor={OFF_WHITE}
        color={BLUE}
        onClick={onPlaybackSpeedClick}
        onMouseEnter={() => setIsHoveringSpeedButton(true)}
        onMouseLeave={() => setIsHoveringSpeedButton(false)}
        size={40}
        stroke={0}
        outline={true}
      >
        <span style={{ transform: 'translateY(1px)' }}>
          <ClockIcon state={playerState} isHovering={isHoveringSpeedButton} />
        </span>
      </CircleButton>
    </Container>
  );
};
