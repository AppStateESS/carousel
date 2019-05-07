'use strict'

const gcd = (x, y) => {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false
  x = Math.abs(x)
  y = Math.abs(y)
  while (y) {
    var t = y
    y = x % y
    x = t
  }
  return x
}

const ratio = (x, y) => {
  x = parseInt(x)
  y = parseInt(y)
  const gcdResult = gcd(x, y)
  const left = x / gcdResult
  const right = y / gcdResult

  return left + ':' + right
}

export default ratio
