export type AudioSetup = {
  audioContext: AudioContext
  analyser: AnalyserNode
}

export const requestMicrophoneAccess = async (): Promise<AudioSetup> => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const source = audioContext.createMediaStreamSource(stream)
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048
  source.connect(analyser)

  return { audioContext, analyser }
}
