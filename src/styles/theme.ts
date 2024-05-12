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
  neutral0: "#FFFFFF",
  neutral20: "#FBFBFD",
  neutral50: "#FBFBFD",
  neutral100: "#FBFBFD",
  neutral200: "#EEEFF7",
  neutral300: "#EAEBF3",
  neutral400: "#A6AAC0",
  neutral500: "#A6AAC0",
  neutral600: "#63698D",
  neutral700: "#343A5D",
  neutral800: "#141623",
  neutral900: "#000000",
  main50: "#F2F2FF",
  main100: "#E5E6FF",
  main200: "#CBCDFF",
  main300: "#B1B4FF",
  main400: "#ADB1FF",
  main500: "#7D82FF",
  main600: "#4B50CF",
  main700: "#252AAB",
  subMain100: "#EBEEFF",
  subMain300: "#C2CCFF",
  subMain500: "#9AAAFF",
  subMain600: "#5C70DB",
  subYellow50: "#FFFEFA",
  subYellow200: "#FFF5D1",
  subYellow300: "#FFEDAA",
  subYellow400: "#FFE483",
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
  title2: FONT({
    weight: 600,
    size: 24,
    lineHeight: 38.4,
  }),
  title4: FONT({
    weight: 600,
    size: 20,
    lineHeight: 28,
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
  subtitle4: FONT({
    weight: 500,
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
