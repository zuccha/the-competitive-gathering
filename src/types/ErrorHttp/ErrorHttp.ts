class ErrorHttp extends Error {
  code: string

  constructor(code: string, message = 'Http Error') {
    super(message)
    this.code = code
  }
}

export default ErrorHttp
