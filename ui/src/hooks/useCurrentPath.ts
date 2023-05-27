import { matchRoutes, useLocation } from 'react-router-dom';
import { BRoutes } from '../router/router';

const useCurrentPath = () => {
  const location = useLocation();
  const rou = Object.values(BRoutes).map(r => ({path: r as string}));
  const match = matchRoutes(rou, location);

  console.log(match?.[0].route?.path);
  return match?.[0].route;
};

export default useCurrentPath;