export default class ChakraUtils {
  public static getColorVariable(color: string) {
    const [hue, light] = color.split('.');
    if (!hue || !light) return 'var(--chakra-colors-gray-400)';
    return `var(--chakra-colors-${hue}-${light})`;
  }
}
