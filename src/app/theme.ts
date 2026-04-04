import { createTheme } from "@mantine/core";

const primaryColors = [
  "#FFF0F5",
  "#FFE3EE",
  "#F5C6DC",
  "#E8A8C6",
  "#E31C79",
  "#C41060",
  "#A8084A",
  "#8A256A",
  "#6E1F56",
  "#38001D",
] as const;

const primaryColorsDark = [
  "#F1EBFF",
  "#E3D6FF",
  "#C9AEFF",
  "#AF85FF",
  "#925CFB",
  "#7A3EF0",
  "#642FC8",
  "#4D219F",
  "#381676",
  "#240C4E",
] as const;

const secondaryColors = [
  "#E6EEFF",
  "#CCDCFF",
  "#99BAFF",
  "#6697FF",
  "#2A65FF", // 4,5 - secondary
  "#2050D9",
  "#163CB3",
  "#0C288C",
  "#061466",
  "#030A33",
] as const;

const darkScale = [
  "#d5deef",
  "#b3c1d9",
  "#8ea0bd",
  "#6f86a7",
  "#566f90",
  "#415a7a",
  "#324a68",
  "#243a56",
  "#162944",
  "#071224",
] as const;

export const theme = createTheme({
  colors: {
    primary: primaryColors,
    primaryDark: primaryColorsDark,
    brand: primaryColors,
    secondary: secondaryColors,
    dark: darkScale,
  },

  primaryColor: "primary",
  primaryShade: { light: 4, dark: 5 },

  other: {
    background: "#F5F7FC",
    backgroundDark: "#071224",
    surface: "#FFFFFF",
    surfaceDark: "#0D1B31",
    surfaceSecondary: "#F0F3FA",
    surfaceSecondaryDark: "#122743",
    textPrimary: "#0E1730",
    textPrimaryDark: "#E6EDF9",
    textSecondary: "#66708A",
    textSecondaryDark: "#A3B3CC",
    textOnPrimary: "#FFFFFF",
    outline: "#D9E1F0",
    outlineDark: "#233B5D",
    indicatorActive: "#E31C79",
    indicatorInactive: "rgba(227, 28, 121, 0.4)",
    buttonSecondaryBackground: "#F0F3FA",
    buttonSecondaryBackgroundDark: "#132743",
    buttonSecondaryContent: "#0E1730",
    buttonSecondaryContentDark: "#E6EDF9",
  },

  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
    xxl: "120em",
  },
});
