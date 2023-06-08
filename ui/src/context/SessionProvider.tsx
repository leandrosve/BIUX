import { PropsWithChildren, createContext, useCallback, useState } from 'react';
import AuthService from '../services/api/AuthService';
import { SessionData } from '../model/session/Session';
import SessionService from '../services/SessionService';

interface ISessionContext {
  session: SessionData | null;
  initialize: (data: SessionData | null) => void;
  destroy: () => void;
}

export const SessionContext = createContext<ISessionContext>({
  session: null,
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

  return <SessionContext.Provider value={{ session, initialize, destroy }}>{props.children}</SessionContext.Provider>;
};

export default SessionProvider;
