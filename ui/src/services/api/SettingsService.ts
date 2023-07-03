import AccesibilityService, { AccesibilitySettings } from '../AccesibilityService';
import APIService from './APIService';

export default class SettingsService extends APIService {
  protected static PATH = '/settings';
  /**
   * Retrieve the user's settings and applies them to the current page
   * @param setColorMode function that changes the theme dark/light
   */
  static async getInitialSettings(setColorMode: (color: string) => void) {
    const res = await this.get<AccesibilitySettings>('/user');
    if (res.hasError) return;
    AccesibilityService.saveAndUpdate(res.data, setColorMode);
  }

  static async updateSettings(settings: Partial<AccesibilitySettings>) {
    return await this.patch<AccesibilitySettings>('/user', settings);
  }
}
