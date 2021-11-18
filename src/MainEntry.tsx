import { ReactElement, useMemo } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Layout } from 'containers/Layout';
import { css, Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { RouteName, routeStyles } from 'constants/routeStyles';
import { HomeView, TipsView, UsersView } from 'views';
import store from 'redux/store';
import { FONT_FAMILY } from 'constants/styles';
import { CanvasRoute } from 'containers/CanvasRoute';
import { ContactView } from 'views/ContactView';

const globalStyles = css`
  body {
    margin: 0;
    font-family: ${FONT_FAMILY};
  }

  * {
    box-sizing: border-box;
  }

  code {
    background-color: #4f2461;
    border-radius: 4px;
    border-bottom: 1px solid #623974;
    display: inline-block;
    padding: 2px 6px;
    color: #cdf7f1;
    font-size: 1.125em;
  }
`;

export const MainEntry = () => {
  // Create the <Route> list from `routeStyles` and the `routeElementMap`
  const routes = useMemo(() => {
    const routeElementMap: Record<RouteName, ReactElement> = {
      Home: <HomeView />,
      Tips: <TipsView />,
      Users: <UsersView />,
      Canvas: <CanvasRoute />,
      Contact: <ContactView />,
    };

    return routeStyles.map(({ title, route, hasSubRoutes }) => (
      <Route
        index={title === 'Home'}
        element={routeElementMap[title]}
        key={`route-${route}`}
        path={`${route}${hasSubRoutes ? '/*' : ''}`}
      />
    ));
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Global styles={globalStyles} />
        <Routes>
          <Route path='/' element={<Layout />}>
            {routes}

            {/* Catch-all for invalid routes */}
            <Route path='*' element={<Navigate to='/' replace={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
