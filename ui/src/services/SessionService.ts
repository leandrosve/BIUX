import { cookieStorageManager } from '@chakra-ui/react';
import { SessionData } from '../model/session/Session';
import AccesibilityService from './AccesibilityService';

export default class SessionService {
  static getLocalSession(): SessionData | null {
    const stringSettings = localStorage.getItem('session');
    if (!stringSettings) return null;
    return JSON.parse(stringSettings);
  }

  static saveLocalSession(data: SessionData | null) {
    localStorage.setItem('session', JSON.stringify(data));
  }

  static destroyLocalSession() {
    localStorage.removeItem('session');
    AccesibilityService.restoreDefaults();
    location.replace("/login");
  }

}
