import state from '../util/state'


function convert_angle_to_spoken_digits(n: number): string {
  // Normally aircraft angles are not spoken like "bearing two hundred and thirty nine",
  // more like "bearing two three niner"
  // https://mediawiki.ivao.aero/index.php?title=Radio_telephony_basics
  let s = n.toFixed(0).padStart(3, '0')
  let c0 = character_pronunciation(s[0])
  let c1 = character_pronunciation(s[1])
  let c2 = character_pronunciation(s[2])
  let cr = c0  + ' ' + c1 + ' ' + c2
  return cr
}
export { convert_angle_to_spoken_digits }


function character_pronunciation(c: string): string {
  c = c.toLowerCase()
  switch(c) { 
    case '0': { return 'zero' }
    case '9': { return 'niner' }
    case '.': { return 'dot' }
    case 'a': { return 'alfa' }
    case 'b': { return 'bravo' }
    case 'c': { return 'charlie' }
    case 'd': { return 'delta' }
    case 'e': { return 'echo' }
    case 'f': { return 'foxtrot' }
    case 'g': { return 'golf' }
    case 'h': { return 'hotel' }
    case 'i': { return 'india' }
    case 'j': { return 'juliet' }
    case 'k': { return 'kilo' }
    case 'l': { return 'lima' }
    case 'm': { return 'mike' }
    case 'n': { return 'november' }
    case 'o': { return 'oscar' }
    case 'p': { return 'papa' }
    case 'q': { return 'quebec' }
    case 'r': { return 'romeo' }
    case 's': { return 'sierra' }
    case 't': { return 'tango' }
    case 'u': { return 'uniform' }
    case 'v': { return 'victor' }
    case 'w': { return 'whiskey' }
    case 'x': { return 'x-ray' }
    case 'y': { return 'yankee' }
    case 'z': { return 'zulu' }
    default: { return c }
  }
}


function convert_bearing_to_spoken_clock(bearing: number): string {
  // Any rcbearing between -15 and 14.999 should be 12 oclock
  let rcbearing_str = (((720 + bearing - state.coords.heading ) % 360) / 30).toFixed(0).toString()
  if (rcbearing_str == '0') { rcbearing_str = '12' }
  return rcbearing_str + ' oclock'
}
export { convert_bearing_to_spoken_clock }

