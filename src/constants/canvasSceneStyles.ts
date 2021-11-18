import { CollisionsScene } from 'canvas/scenes/CollisionsScene';
import { LerpingScene } from 'canvas/scenes/LerpingScene';
import { MeasureDistanceScene } from 'canvas/scenes/MeasureDistanceScene';

export const canvasSceneOrder = [
  MeasureDistanceScene,
  LerpingScene,
  CollisionsScene,
] as const;

export type SceneKey = typeof canvasSceneOrder[number]['Id'];

type CanvasSceneStyle = {
  title: string;
  route: string;
};

export const canvasSceneStyles: Record<SceneKey, CanvasSceneStyle> = {
  [MeasureDistanceScene.Id]: {
    title: 'Measure Distances',
    route: 'measure-distance',
  },
  [CollisionsScene.Id]: {
    title: 'Collision Detection',
    route: 'collisions',
  },
  [LerpingScene.Id]: { title: 'Lerping', route: 'lerping' },
};

export const sceneRouteParams = Object.values(canvasSceneStyles).map(
  ({ route }) => route
);

export const sceneRouteToId = Object.entries(canvasSceneStyles).reduce(
  (acc, [id, { route }]) => {
    acc[route] = id as SceneKey;
    return acc;
  },
  {} as Record<string, SceneKey>
);

export const sceneRoutes: string[] = canvasSceneOrder.map(
  ({ Id }) => canvasSceneStyles[Id].route
);

export const getScenePath = (sceneParam: string) => {
  const basePath = '/canvas';
  return sceneRoutes.includes(sceneParam)
    ? `${basePath}/${sceneParam}`
    : basePath;
};
