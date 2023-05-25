export function K6plus(): number {
  let total = 0
  let num

  do {
    num = Math.floor(Math.random() * 5 + 1)
    total += num
  } while(num === 6)

  return total
}

export function K20(): number {
  return Math.floor(Math.random() * 19 + 1)
}

export function K12(): number {
  return Math.floor(Math.random() * 11 + 1)
}

export function K8(): number {
  return Math.floor(Math.random() * 7 + 1)
}

export function K6(): number {
  return Math.floor(Math.random() * 5 + 1)
}

export function K4(): number {
  return Math.floor(Math.random() * 3 + 1)
}

export function K10(): number {
  return Math.floor(Math.random() * 9 + 1)
}

export function K100(): number {
  return Math.floor(Math.random() * 99 + 1)
}

export type Race = 'skrat' | 'human' | 'elf' | 'halfling' | 'halforc' | 'gnome'
export type Occupation = 'warrior' | 'mage' | 'thief' | 'ranger' | 'monk'
