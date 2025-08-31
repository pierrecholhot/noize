import { getThemeColors, colors } from '../theme'

export type ThemeSwitchProps = {
  theme: Theme
  onToggle: () => void
}

export const ThemeSwitch = ({ theme, onToggle }: ThemeSwitchProps) => {
  const themeColors = getThemeColors(theme)

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      title="Toggle theme"
    >
      <input
        type="checkbox"
        style={{
          display: 'none',
        }}
        checked={theme === 'dark'}
        onChange={onToggle}
        aria-label="Switch theme"
      />
      <span
        style={{
          width: '72px',
          height: '40px',
          background: themeColors.toggleBackground,
          borderRadius: '20px',
          position: 'relative',
          transition: 'background 0.3s',
        }}
      >
        <span
          style={{
            content: "''",
            position: 'absolute',
            left: theme === 'dark' ? '36px' : '4px',
            top: '4px',
            width: '32px',
            height: '32px',
            background: themeColors.toggleKnob,
            borderRadius: '50%',
            boxShadow: `0 2px 4px ${colors.shadow}`,
            transition: 'left 0.3s, background 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2em',
          }}
          role="img"
          aria-label={theme === 'dark' ? 'Dark' : 'Light'}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
      </span>
    </label>
  )
}
