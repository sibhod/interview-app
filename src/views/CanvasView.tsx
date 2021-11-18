import { BORDER_RADIUS, CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/layout';
import { FlexSection } from 'containers/FlexSection';
import { useEffect, useRef, useState, useMemo } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import {
  DARK_GREY,
  OFF_WHITE,
  LIGHT_GREY,
  MEDIUM_GREY,
  BLUE,
} from 'constants/colors';
import { CanvasController } from 'canvas/CanvasController';
import { MeasureDistanceScene } from 'canvas/scenes/MeasureDistanceScene';
import { BORDER, BOX_SHADOW } from 'constants/styles';
import { FONT_FAMILY } from 'constants/styles';
import {
  canvasSceneOrder,
  canvasSceneStyles,
  sceneRouteToId,
  sceneRoutes,
  getScenePath,
} from 'constants/canvasSceneStyles';
import { Select } from 'components/Select';
import { PlayerControls } from 'components/PlayerControls';
import { resolvePath, useNavigate, useParams } from 'react-router';
import {
  getNextPlaybackSpeed,
  PlaybackSpeed,
  ScenePlayerState,
} from 'types/ScenePlayerState';
import { Note } from 'components/Note';

const SelectLabel = styled.label`
  font-size: 0.65rem;
  font-weight: bold;
  color: ${MEDIUM_GREY};
`;

const ControlContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 40px;
  opacity: 0.125;
  transition: opacity 0.2s ease;
`;

const CanvasContainer = styled.div`
  box-shadow: ${BOX_SHADOW};
  border-radius: 12px;
  height: ${CANVAS_HEIGHT}px;
  overflow: hidden;
  position: relative;
  transition: border-color 0.15s ease;

  &:hover,
  &:focus {
    border-color: ${BLUE};

    & ${ControlContainer} {
      opacity: 1;
    }
  }
`;

export const CanvasView = () => {
  const navigate = useNavigate();
  const { scene } = useParams();
  const sceneId = useMemo(() => scene && sceneRouteToId[scene], [scene]);
  const [playerState, setPlayerState] = useState<ScenePlayerState>({
    isControllerRunning: false,
    isPlaying: true,
    playbackSpeed: PlaybackSpeed.NORMAL,
  });

  const [canvasNode, setCanvasNode] = useState<HTMLCanvasElement | null>(null);
  const controllerRef = useRef<CanvasController | null>(null);

  useEffect(() => {
    if (sceneId) {
      setPlayerState((state) => ({
        ...state,
        isPlaying: true,
      }));
      controllerRef.current?.setActiveScene(sceneId);
    } else {
      navigate(getScenePath(sceneRoutes[0]), { replace: true });
    }
  }, [sceneId]);

  useEffect(() => {
    if (canvasNode) {
      const scenes = canvasSceneOrder.map((LayerClass) => new LayerClass());
      const activeSceneId = (scene && sceneRouteToId[scene]) ?? undefined;
      const onRunStateChange = (isControllerRunning: boolean) =>
        setPlayerState((state) => ({ ...state, isControllerRunning }));
      controllerRef.current = new CanvasController({
        canvas: canvasNode,
        scenes,
        onRunStateChange,
        state: playerState,
        activeSceneId,
      });
    }

    return () => controllerRef.current?.dispose();
  }, [canvasNode]);

  useEffect(
    () => controllerRef.current?.setPlayerState(playerState),
    [playerState]
  );

  const sceneOptions = useMemo(
    () =>
      canvasSceneOrder.map(({ Id: id }) => {
        const { title } = canvasSceneStyles[id];

        return (
          <option key={id} value={id}>
            {title}
          </option>
        );
      }),
    []
  );

  const handleSceneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value as keyof typeof canvasSceneStyles;
    const routeParam = canvasSceneStyles[id].route;

    routeParam && navigate(getScenePath(routeParam));
  };

  const handleTogglePlayback = () =>
    setPlayerState((state) => ({
      ...state,
      isPlaying: !state.isPlaying,
    }));

  const handlePlaybackSpeedClick = () =>
    setPlayerState((state) => ({
      ...state,
      playbackSpeed: getNextPlaybackSpeed(state.playbackSpeed),
    }));

  return (
    <FlexSection>
      <div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 12px;
            padding-bottom: 1em;
          `}
        >
          <SelectLabel>SCENES:</SelectLabel>
          <Select
            onChange={handleSceneChange}
            value={sceneId ?? canvasSceneOrder[0].Id}
          >
            {sceneOptions}
          </Select>
        </div>
        <CanvasContainer>
          <canvas
            ref={setCanvasNode}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          ></canvas>
          <ControlContainer>
            <PlayerControls
              playerState={playerState}
              onPlayClick={handleTogglePlayback}
              onPlaybackSpeedClick={handlePlaybackSpeedClick}
            />
          </ControlContainer>
        </CanvasContainer>
      </div>
      <Note
        header={
          <>
            <code>{'<canvas />'}</code>, 2D Math, and render loops
          </>
        }
        body={
          <>
            <p>
              This section entails a series of challenges on
              <code>{'<canvas />'}</code> rendering, animations over time, and
              standard 2d math, like distance between objects and AABB hit
              detection.
            </p>
            <p>
              I'd definitely appreciate input on what sort of tasks would be
              considered easy, or easily testable. I don't expect that all
              candidates will take to these sorts of tasks, but it overlaps with
              our products quite a bit (and I personally find them very fun).
            </p>
          </>
        }
      />
    </FlexSection>
  );
};
