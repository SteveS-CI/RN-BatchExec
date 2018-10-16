export function optimalForeColor(backColor) {
  const R = parseInt(backColor.substr(1, 2), 16)
  const G = parseInt(backColor.substr(3, 2), 16)
  const B = parseInt(backColor.substr(5, 2), 16)
  const BR = Math.sqrt((R * R * 0.299) + (G * G * 0.587) + (B * B * 0.114))
  return (BR > 155) ? 'black' : 'white'
}
