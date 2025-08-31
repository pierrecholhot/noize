import { getColors } from '../theme'

export type NoiseLevelProps = {
  noiseLevel: number
  theme: Theme
  isAlert: boolean
}

export const NoiseLevel = ({ noiseLevel, theme, isAlert }: NoiseLevelProps) => {
  const themeColors = getColors(theme, isAlert)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '40vw',
          lineHeight: 1,
          fontWeight: 'bold',
          transition: 'color 0.3s, opacity 0.3s',
          color: themeColors.text,
          opacity: 0.25,
        }}
      >
        {noiseLevel}
        <sup style={{ position: 'absolute', fontSize: '0.3em', marginLeft: '0.1em' }}>dB</sup>
      </div>
    </div>
  )
}
