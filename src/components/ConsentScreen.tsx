import { getThemeColors } from '../theme'
import { Logo } from './Logo'

export type ConsentScreenProps = {
  onRequestMic: () => void
  theme: Theme
}

export const ConsentScreen = ({ onRequestMic, theme }: ConsentScreenProps) => {
  const themeColors = getThemeColors(theme)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        gap: '2em',
      }}
    >
      <Logo />
      <p style={{ margin: 0, padding: '0 1.2em', textAlign: 'center' }}>
        This app measures ambient noise using your microphone.
        <br />
        Recordings are processed in real-time in the browser and are never stored nor sent to any server.
      </p>
      <button
        onClick={onRequestMic}
        style={{
          borderRadius: '8px',
          border: '1px solid transparent',
          padding: '0.6em 1.2em',
          fontSize: '1.2em',
          fontWeight: 500,
          fontFamily: 'inherit',
          cursor: 'pointer',
          backgroundColor: themeColors.buttonBackground,
          color: themeColors.buttonText,
          transition: 'border-color 0.25s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = themeColors.primary
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'transparent'
        }}
      >
        Allow Microphone Access
      </button>
    </div>
  )
}
