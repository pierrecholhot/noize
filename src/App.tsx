import { useEffect, useRef, useState } from 'react'
import { ThemeSwitch } from './components/ThemeSwitch'
import { ConsentScreen } from './components/ConsentScreen'
import { NoiseLevel } from './components/NoiseLevel'
import { ThresholdSlider } from './components/ThresholdSlider'
import { requestMicrophoneAccess } from './utils/microphoneAccess'
import { createNoiseAnalysisLoop } from './utils/noiseAnalysis'
import { getColors } from './theme'
import { Logo } from './components/Logo'
import { NoiseAlert } from './components/NoiseAlert'

function App() {
  const [hasConsent, setHasConsent] = useState(false)
  const [threshold, setThreshold] = useState(85) // dB
  const [noiseLevel, setNoiseLevel] = useState(0)
  const [isAlert, setIsAlert] = useState(false)
  const [autoDismiss, setAutoDismiss] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const autoDismissTimeoutRef = useRef<number | null>(null)

  const themeColors = getColors(theme, isAlert)

  const requestMic = async () => {
    try {
      const { audioContext, analyser } = await requestMicrophoneAccess()
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      setHasConsent(true)
    } catch (err) {
      console.log(err)
      alert('Microphone access denied.')
    }
  }

  useEffect(() => {
    if (!hasConsent || !analyserRef.current) return
    cleanupRef.current = createNoiseAnalysisLoop(analyserRef.current, setNoiseLevel)
    return () => {
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [hasConsent])

  useEffect(() => {
    if (!isAlert) {
      setIsAlert(noiseLevel >= threshold)
    }
  }, [noiseLevel, threshold, isAlert])

  // Auto-dismiss logic: when enabled and alert is visible, hide it after 10s
  useEffect(() => {
    // Clear any previous timer
    if (autoDismissTimeoutRef.current) {
      window.clearTimeout(autoDismissTimeoutRef.current)
      autoDismissTimeoutRef.current = null
    }
    if (isAlert && autoDismiss) {
      autoDismissTimeoutRef.current = window.setTimeout(() => {
        setIsAlert(false)
        autoDismissTimeoutRef.current = null
      }, 10000)
    }
    return () => {
      if (autoDismissTimeoutRef.current) {
        window.clearTimeout(autoDismissTimeoutRef.current)
        autoDismissTimeoutRef.current = null
      }
    }
  }, [isAlert, autoDismiss])

  return (
    <div
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
        display: 'flex',
        height: '100vh',
        placeItems: 'center',
        transition: 'color 0.3s, background-color 0.3s',
        minWidth: '100%',
      }}
      onClick={() => {
        setIsAlert(false)
      }}
    >
      {!hasConsent ? (
        <ConsentScreen onRequestMic={requestMic} theme={theme} />
      ) : (
        <>
          <NoiseLevel noiseLevel={noiseLevel} theme={theme} isAlert={isAlert} />
          {isAlert && (
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', zIndex: 3 }}>
              <NoiseAlert
                threshold={threshold}
                autoDismiss={autoDismiss}
                setAutoDismiss={setAutoDismiss}
                theme={theme}
              />
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 2 }}>
            <ThresholdSlider threshold={threshold} setThreshold={setThreshold} theme={theme} />
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1 }}>
            <Logo />
          </div>
        </>
      )}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2 }}>
        <ThemeSwitch theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      </div>
    </div>
  )
}

export default App
