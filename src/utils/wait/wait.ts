const wait = async (ms = 0): Promise<void> => {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

export default wait
