const when = <T>(cases: [boolean, () => T][], defaultValue: () => T): T => {
  const match = cases.find(([condition]) => condition)
  return match !== undefined
    ? match[1]()
    : defaultValue()
}

export default when
