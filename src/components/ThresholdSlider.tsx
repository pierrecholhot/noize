import { getThemeColors, colors } from '../theme'

export type ThresholdSliderProps = {
  threshold: number
  setThreshold: (value: number) => void
  theme: Theme
}

export const ThresholdSlider = ({ threshold, setThreshold, theme }: ThresholdSliderProps) => {
  const themeColors = getThemeColors(theme)
  const min = 40
  const max = 100
  const clamped = Math.min(max, Math.max(min, threshold))
  const progress = ((clamped - min) / (max - min)) * 100

  return (
    <div
      style={{
        maxWidth: '320px',
        minWidth: '200px',
        width: '100%',
        transition: 'color 0.3s',
        color: themeColors.text,
        background: themeColors.background,
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: `0 2px 6px ${themeColors.shadow}`,
      }}
    >
      <label htmlFor="threshold">Threshold: {threshold} dB</label>
      <div style={{ position: 'relative', height: 28 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: 8,
            background: themeColors.toggleBackground,
            borderRadius: 999,
            boxShadow: `inset 0 1px 2px ${colors.shadow}`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: themeColors.primary,
              transition: 'width 120ms ease-out',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `calc(${progress}% - 10px)`, // center a 20px thumb
            transform: 'translateY(-50%)',
            width: 20,
            height: 20,
            background: themeColors.toggleKnob,
            borderRadius: '50%',
            border: `2px solid ${themeColors.primary}`,
            boxShadow: `0 2px 6px ${colors.shadow}`,
            transition: 'left 120ms ease-out, background 200ms',
            pointerEvents: 'none', // let native input capture events
          }}
        />
        <input
          id="threshold"
          type="range"
          min={min}
          max={max}
          value={clamped}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            opacity: 0,
            cursor: 'pointer',
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
          aria-label="Threshold slider"
        />
      </div>
    </div>
  )
}
