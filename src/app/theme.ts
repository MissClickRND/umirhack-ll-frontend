import { createTheme } from "@mantine/core";

const brandColors = [
  '#FFF0F5', '#FFE3EE', '#F5C6DC', '#E8A8C6', '#E31C79', // 4,5 - primary
  '#C41060', '#A8084A', '#8A256A', '#7A3EF0', // 8 - primaryDark
  '#38001D',
] as const;

const secondaryColors = [
  '#E6EEFF', '#CCDCFF', '#99BAFF', '#6697FF', '#2A65FF', // 4,5 - secondary
  '#2050D9', '#163CB3', '#0C288C', '#061466', '#030A33',
] as const;

export const theme = createTheme({

  colors: {
    brand: brandColors,
    secondary: secondaryColors,
  },

  primaryColor: 'brand',
  primaryShade: 4, // Индекс #E31C79

  other: {
    surfaceSecondary: '#F0F3FA',
    textPrimary: '#0E1730',
    textSecondary: '#66708A',
    textOnPrimary: '#FFFFFF',
    outline: '#D9E1F0',
    indicatorActive: '#E31C79',
    indicatorInactive: 'rgba(227, 28, 121, 0.4)',
    buttonSecondaryBackground: '#F0F3FA',
    buttonSecondaryContent: '#0E1730',
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