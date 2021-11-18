import {
  faHome,
  faCommentAlt,
  faUserFriends,
  faPaintRoller,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';

export const routeStyles = [
  { title: 'Home', route: '', hasSubRoutes: false },
  { title: 'Tips', route: 'tips', hasSubRoutes: false },
  { title: 'Users', route: 'users', hasSubRoutes: false },
  {
    title: 'Canvas',
    route: 'canvas',
    hasSubRoutes: true,
  },
  { title: 'Contact', route: 'contact', hasSubRoutes: false },
] as const;

export type RouteStyle = typeof routeStyles[number];
export type RouteName = typeof routeStyles[number]['title'];
