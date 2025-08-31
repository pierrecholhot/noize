export const colors = {
  primary: {
    light: 'rgba(116, 123, 255, 0.87)',
    dark: 'rgba(100, 108, 255, 0.87)',
  },
  background: {
    light: 'rgba(255, 255, 255, 0.87)',
    dark: 'rgba(0, 0, 0, 0.87)',
    alert: 'rgba(255, 59, 59, 0.87)',
  },
  text: {
    light: 'rgba(0, 0, 0, 0.87)',
    dark: 'rgba(255, 255, 255, 0.87)',
    alert: 'rgba(109, 6, 6, 0.87)',
  },
  button: {
    background: {
      light: 'rgba(26, 26, 26, 0.87)',
      dark: 'rgba(249, 249, 249, 0.87)',
    },
    text: {
      light: 'rgba(249, 249, 249, 0.87)',
      dark: 'rgba(26, 26, 26, 0.87)',
    },
  },
  toggle: {
    background: {
      light: 'rgba(228, 228, 228, 0.87)',
      dark: 'rgba(100, 108, 255, 0.87)',
    },
    knob: {
      light: 'rgba(255, 255, 255, 0.87)',
      dark: 'rgba(33, 53, 71, 0.87)',
    },
  },
  shadow: 'rgba(0, 0, 0, 0.2)',
  transparent: 'transparent',
}

export const lightTheme: ThemeColors = {
  primary: colors.primary.light,
  background: colors.background.light,
  text: colors.text.light,
  buttonBackground: colors.button.background.light,
  buttonText: colors.button.text.light,
  toggleBackground: colors.toggle.background.light,
  toggleKnob: colors.toggle.knob.light,
  shadow: colors.shadow,
}

export const darkTheme: ThemeColors = {
  primary: colors.primary.dark,
  background: colors.background.dark,
  text: colors.text.dark,
  buttonBackground: colors.button.background.dark,
  buttonText: colors.button.text.dark,
  toggleBackground: colors.toggle.background.dark,
  toggleKnob: colors.toggle.knob.dark,
  shadow: colors.shadow,
}

export const getThemeColors = (theme: Theme): ThemeColors => {
  return theme === 'dark' ? darkTheme : lightTheme
}

export const getColors = (theme: Theme, isAlert: boolean = false) => {
  const themeColors = getThemeColors(theme)

  if (isAlert) {
    return {
      ...themeColors,
      background: colors.background.alert,
      text: colors.text.alert,
    }
  }

  return themeColors
}
