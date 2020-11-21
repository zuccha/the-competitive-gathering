const validateObject = <T>(maybeObject: unknown): maybeObject is Partial<Record<keyof T, unknown>> => {
  return typeof maybeObject === 'object' && maybeObject !== null
}

export default validateObject
