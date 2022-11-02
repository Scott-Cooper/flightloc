import state from '../util/state'


function convert_angle_to_spoken_digits(n: number): string {
  // Normally aircraft angles are not spoken like "bearing two hundred and thirty nine",
  // more like "bearing two three niner"
  // https://mediawiki.ivao.aero/index.php?title=Radio_telephony_basics
  var s = n.toFixed(0).padStart(3, '0')
  var c0 = character_pronunciation(s[0])
  var c1 = character_pronunciation(s[1])
  var c2 = character_pronunciation(s[2])
  var cr = c0  + ' ' + c1 + ' ' + c2
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
  // Any rcbearing between -15 and 15 should be 12 oclock
  var rcbearing = ((720 + bearing - state.coords.heading - 15) % 360) / 30
  return rcbearing.toFixed(0).toString() + ' oclock'
}
export { convert_bearing_to_spoken_clock }

