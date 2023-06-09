import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';
import AuthService from '../services/api/AuthService';
import { SessionData } from '../model/session/Session';
import SessionService from '../services/SessionService';

interface ISessionContext {
  session: SessionData | null;
  isLoggedIn: boolean;
  initialize: (data: SessionData | null) => void;
  destroy: () => void;
}

export const SessionContext = createContext<ISessionContext>({
  session: null,
  isLoggedIn: false,
  initialize: () => {},
  destroy: () => {},
});

const SessionProvider = (props: PropsWithChildren) => {
  const [session, setSession] = useState<SessionData | null>(SessionService.getLocalSession());
  const initialize = useCallback(
    (data: SessionData | null) => {
      setSession(data);
    },
    [setSession]
  );
  const destroy = useCallback(() => {
    setSession(null);
  }, [setSession]);
  const isLoggedIn = useMemo(() => !!session, [session]);

  return <SessionContext.Provider value={{ session, isLoggedIn, initialize, destroy }}>{props.children}</SessionContext.Provider>;
};

export default SessionProvider;
