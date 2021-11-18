import { OFF_WHITE, LIGHT_GREY, BLUE, DARK_GREY } from 'constants/colors';
import { hexToRgba } from 'util/color';

export const FONT_FAMILY = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;
export const BORDER = `solid 1px ${LIGHT_GREY}`;
export const BOX_SHADOW_LIGHT = `0px 3px 5px 1px ${hexToRgba(DARK_GREY, 0.07)}`;
export const BOX_SHADOW = `0px 4px 10px 2px ${hexToRgba(DARK_GREY, 0.125)}`;
export const BOX_SHADOW_WHITE = `0px 4px 10px 2px ${hexToRgba(
  OFF_WHITE,
  0.25
)}`;
