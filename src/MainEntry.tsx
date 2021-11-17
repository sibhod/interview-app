import { ReactElement, useMemo } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Layout } from 'containers/Layout';
import { css, Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { RouteName, routeStyles } from 'constants/routeStyles';
import { HomeView, TipsView, UsersView } from 'views';
import store from 'redux/store';

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  code {
    display: inline-block;
    padding: 2px 4px;
    background-color: #ddd;
  }
`;

export const MainEntry = () => {
  // Create the <Route> list from `routeStyles` and the `routeElementMap`
  const routes = useMemo(() => {
    const routeElementMap: Record<RouteName, ReactElement> = {
      Home: <HomeView />,
      Tips: <TipsView />,
      Users: <UsersView />,
      'Link Two': <span children="Link Two" />,
      'Link Three': <span children="Link Three" />,
      Contact: <span children="Contact" />,
    };

    return routeStyles.map(({ title, route }) => (
      <Route
        index={title === 'Home'}
        element={routeElementMap[title]}
        key={`route-${route}`}
        path={route}
      />
    ));
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Global styles={globalStyles} />
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes}

            {/* Catch-all for invalid routes */}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
