import { NavigationState } from '@react-navigation/native';

export const INITIAL_ROUTE = 'Home';

export const getInitialRoute = (state?: NavigationState | undefined) => {
  if (state?.routes?.length > 0) {
    const firstRoute = state.routes[0];
    return firstRoute.name;
  }
  return INITIAL_ROUTE;
};

export const isRootScreen = (routeName: string) => {
  return routeName === INITIAL_ROUTE;
};
