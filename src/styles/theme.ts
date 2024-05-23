import { DefaultTheme } from "styled-components";
import "../assets/fonts/Font.css";

interface Font {
  family: string;
  weight: number;
  size: number;
  lineHeight: number;
}

const FONT = ({ family, weight, size, lineHeight }: Font): string => {
  return `
    font-family : ${family};
    font-weight :${weight};
    font-size : ${size}px;
    line-height : ${lineHeight}px;
    letter-spacing: normal;
    `;
};

const colors = {
  neutral0: "#FFFFFF",
  neutral20: "#FBFBFD",
  neutral50: "#FBFBFD",
  neutral100: "#F2F3F9",
  neutral200: "#EEEFF7",
  neutral300: "#EAEBF3",
  neutral400: "#D9DBE6",
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
  subSecondary500: "#9AAAFF",
  mainbg: "#FAFAFF",
};

const fonts = {
  headline1: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 36,
    lineHeight: 48,
  }),
  headline2: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 32,
    lineHeight: 36,
  }),
  headline3: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 32,
    lineHeight: 36,
  }),
  title1: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 28,
    lineHeight: 32,
  }),
  title2: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 24,
    lineHeight: 28,
  }),
  title3: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 22,
    lineHeight: 26,
  }),
  title4: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 20,
    lineHeight: 24,
  }),
  subtitle1: FONT({
    family: "Pretendard-Medium",
    weight: 600,
    size: 20,
    lineHeight: 20,
  }),
  subtitle2: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 18,
    lineHeight: 20,
  }),
  subtitle3: FONT({
    family: "Pretendard-SemiBold",
    weight: 600,
    size: 16,
    lineHeight: 20,
  }),
  subtitle4: FONT({
    family: "Pretendard-Medium",
    weight: 500,
    size: 16,
    lineHeight: 20,
  }),
  subtitle5: FONT({
    family: "Pretendard-SemiBold",
    weight: 500,
    size: 14,
    lineHeight: 24,
  }),
  body1: FONT({
    family: "Pretendard-Regular",
    weight: 500,
    size: 22,
    lineHeight: 26,
  }),
  body2: FONT({
    family: "Pretendard-Medium",
    weight: 500,
    size: 18,
    lineHeight: 20,
  }),
  body3: FONT({
    family: "Pretendard-Regular",
    weight: 500,
    size: 16,
    lineHeight: 18,
  }),
  body4: FONT({
    family: "Pretendard-Medium",
    weight: 400,
    size: 14,
    lineHeight: 16,
  }),
  body5: FONT({
    family: "Pretendard-Regular",
    weight: 400,
    size: 13,
    lineHeight: 15,
  }),
  cap1: FONT({
    family: "Pretendard-Regular",
    weight: 400,
    size: 14,
    lineHeight: 16,
  }),
  cap2: FONT({
    family: "Pretendard-Medium",
    weight: 400,
    size: 12,
    lineHeight: 14,
  }),
  cap3: FONT({
    family: "Pretendard-Regular",
    weight: 400,
    size: 12,
    lineHeight: 14,
  }),
  cap4: FONT({
    family: "Pretendard-Regular",
    weight: 400,
    size: 14,
    lineHeight: 14,
  }),
  button1: FONT({
    family: "Pretendard-SemiBold",
    weight: 400,
    size: 18,
    lineHeight: 20,
  }),
  button2: FONT({
    family: "Pretendard-SemiBold",
    weight: 400,
    size: 16,
    lineHeight: 20,
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
