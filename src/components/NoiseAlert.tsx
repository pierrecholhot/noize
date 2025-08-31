import { getColors, lightTheme } from '../theme'

interface NoiseAlertProps {
  threshold: number
  autoDismiss: boolean
  setAutoDismiss: (checked: boolean) => void
  theme: Theme
}

export const NoiseAlert = ({ threshold, autoDismiss, setAutoDismiss, theme }: NoiseAlertProps) => {
  const themeColors = getColors(theme, true)

  return (
    <div
      style={{
        backgroundColor: lightTheme.background,
        color: themeColors.primary,
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: `0 2px 6px ${lightTheme.shadow}`,
        fontWeight: 'bold',
        userSelect: 'none',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '400px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ textTransform: 'uppercase' }}>⚠️ Noise levels exceeded {threshold} dB</div>
      <hr style={{ border: 'none', borderTop: `1px solid ${lightTheme.shadow}`, margin: '8px 0' }} />
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={autoDismiss}
          onChange={(e) => setAutoDismiss(e.target.checked)}
          style={{ cursor: 'pointer' }}
        />
        Auto-dismiss after 10s
      </label>
    </div>
  )
}
