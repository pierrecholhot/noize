// The midpoint of the Uint8Array from getByteTimeDomainData(). Values range from 0 to 255.
const PCM_MIDPOINT = 128

// A subjective calibration offset to shift the dB value to a more intuitive range.
const DB_CALIBRATION = 90

// A small value to prevent taking the log of zero, which is -Infinity.
const EPSILON = 1e-7

export const getRMS = (arr: Uint8Array): number => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i] - PCM_MIDPOINT // Center on zero
    sum += val * val
  }
  return Math.sqrt(sum / arr.length)
}

export const convertRMSToDecibels = (rms: number): number => {
  // The RMS value is normalized to a 0-1 range, then converted to dB.
  const normalizedRms = rms / PCM_MIDPOINT
  const db = 20 * Math.log10(normalizedRms + EPSILON) + DB_CALIBRATION

  // Clamp to 0 to avoid negative values for very quiet audio.
  return Math.max(0, Math.round(db))
}

export const createNoiseAnalysisLoop = (
  analyser: AnalyserNode,
  onNoiseUpdate: (noiseLevel: number) => void
): (() => void) => {
  const bufferLength = analyser.fftSize
  const dataArray = new Uint8Array(bufferLength)
  let animationFrame: number | null = null

  const updateNoise = () => {
    analyser.getByteTimeDomainData(dataArray)
    const rms = getRMS(dataArray)
    const db = convertRMSToDecibels(rms)
    onNoiseUpdate(db)
    animationFrame = requestAnimationFrame(updateNoise)
  }

  // Start the loop
  animationFrame = requestAnimationFrame(updateNoise)

  // Return cleanup function
  return () => {
    if (animationFrame) cancelAnimationFrame(animationFrame)
  }
}
