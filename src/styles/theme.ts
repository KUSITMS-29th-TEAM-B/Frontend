import { DefaultTheme } from "styled-components";

interface Font {
  weight: number;
  size: number;
  lineHeight: number;
}

const FONT = ({ weight, size, lineHeight }: Font): string => {
  return `
    font-family : "Pretendard";
    font-weight : ${weight};
    font-size : ${size}px;
    line-height : ${lineHeight}px;
    `;
};

const colors = {
  netural0: "#FFFFFF",
  netural20: "#FBFBFD",
  netural50: "#FBFBFD",
  netural100: "#FBFBFD",
  netural200: "#EEEFF7",
  netural300: "#EAEBF3",
  netural400: "#A6AAC0",
  netural500: "#A6AAC0",
  netural600: "#63698D",
  netural700: "#343A5D",
  netural800: "#141623",
  netural900: "#000000",
};

const fonts = {
  headline1: FONT({
    weight: 600,
    size: 44,
    lineHeight: 68,
  }),
  headline2: FONT({
    weight: 600,
    size: 32,
    lineHeight: 68,
  }),
  title1: FONT({
    weight: 600,
    size: 28,
    lineHeight: 68,
  }),
  subtitle1: FONT({
    weight: 600,
    size: 18,
    lineHeight: 68,
  }),
  subtitle2: FONT({
    weight: 600,
    size: 16,
    lineHeight: 20,
  }),
  subtitle3: FONT({
    weight: 600,
    size: 16,
    lineHeight: 20,
  }),
  body1: FONT({
    weight: 500,
    size: 24,
    lineHeight: 68,
  }),
  body2: FONT({
    weight: 500,
    size: 18,
    lineHeight: 68,
  }),
  body3: FONT({
    weight: 500,
    size: 16,
    lineHeight: 18,
  }),
  body4: FONT({
    weight: 400,
    size: 16,
    lineHeight: 18,
  }),
  body5: FONT({
    weight: 400,
    size: 14,
    lineHeight: 18,
  }),
};

const deviceSizes = {
  mobile: "390px",
  tablet: "768px",
  desktop: "1536px",
};

const devices = {
  mobile: `screen and (min-width: ${deviceSizes.mobile})`,
  tablet: `screen and (min-width: ${deviceSizes.tablet})`,
  desktop: `screen and (min-width: ${deviceSizes.desktop})`,
};

export type ColorTypes = typeof colors;
export type FontTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
  devices,
};
