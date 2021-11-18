import { Routes, Route, Navigate } from 'react-router';
import { sceneRouteParams } from 'constants/canvasSceneStyles';
import { CanvasView } from 'views/CanvasView';

export const CanvasRoute = () => {
  return (
    <Routes>
      <Route path={`:scene`} element={<CanvasView />} />
      <Route
        path='*'
        element={<Navigate to={`${sceneRouteParams[0]}`} replace={true} />}
      />
    </Routes>
  );
};
