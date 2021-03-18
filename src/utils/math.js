const roundedSquareWave = (time, delta, amplitude, frequency) => {
    return ((2 * amplitude) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * time * frequency) / delta)
}

export { roundedSquareWave }