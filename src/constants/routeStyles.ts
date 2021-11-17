export const routeStyles = [
  { title: 'Home', route: '' },
  { title: 'Tips', route: 'tips' },
  { title: 'Users', route: 'users' },
  { title: 'Link Two', route: 'link-two' },
  { title: 'Link Three', route: 'link-three' },
  { title: 'Contact', route: 'contact' },
] as const;

export type RouteStyle = typeof routeStyles[number];
export type RouteName = typeof routeStyles[number]['title'];
