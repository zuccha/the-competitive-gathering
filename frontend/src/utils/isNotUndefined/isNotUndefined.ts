const isNotUndefined = <T>(x: T | undefined): x is T => {
  return x !== undefined
}

export default isNotUndefined
