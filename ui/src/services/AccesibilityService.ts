export interface AccesibilitySettings {
  fontFamily: string;
  fontSize: string;
  color: string;
  colorMode: string;
}

const hues:Record<string, number> = {
  'pink': 50,
  'red': 110,
  'orange': 130,
  'yellow': 150,
  'green': 220,
  'teal': 290,
  'blue': 320,
  'cyan': 310,
  'primary': 0,
}

export default class AccesibilityService {
  static DEFAULT_SETTINGS: AccesibilitySettings = {
    fontFamily: 'Nunito',
    fontSize: '18px',
    color: 'biux',
    colorMode: 'light',
  };

  static initialize() {
    const settings = this.getLocalSettings();
    this.updateFont(settings.fontFamily, settings.fontSize);
    this.updateColor(settings.color);
    return settings;
  }

  static restoreDefaults() {
    this.updateFont(this.DEFAULT_SETTINGS.fontFamily, this.DEFAULT_SETTINGS.fontSize);
    this.updateColor(this.DEFAULT_SETTINGS.color);
    this.deleteLocalSettings();
  }

  static updateFont(fontFamily?: string, fontSize?: string) {
    if (fontFamily) document.documentElement.style.setProperty('--font-family', fontFamily);
    if (fontSize) document.documentElement.style.setProperty('--base-font-size', fontSize);
  }
  /**
   *
   * @param color color must be from ChakraUI scheme
   */
  static updateColor(color: string) {
    if (!color) return;
    const breakPoints = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50];
    const prefix = ['biux'].includes(color) ? '--' : '--chakra-colors-';
    breakPoints.forEach((br) => {
      document.documentElement.style.setProperty(`--primary-${br}`, `var(${prefix}${color}-${br})`);
    });
    document.documentElement.style.setProperty(`--hue-rotate`, `${hues[color]}deg`);
  }

  static saveLocalSettings(settings: AccesibilitySettings) {
    localStorage.setItem('accesibilitySettings', JSON.stringify(settings));
  }

  static deleteLocalSettings() {
    localStorage.removeItem('accesibilitySettings');
  }

  static getLocalSettings(): AccesibilitySettings {
    const stringSettings = localStorage.getItem('accesibilitySettings');
    if (!stringSettings) return this.DEFAULT_SETTINGS;
    console.log(stringSettings)
    return JSON.parse(stringSettings);
  }
}
