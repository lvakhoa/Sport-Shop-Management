class HttpException extends Error {
  constructor(status: number, message: string) {
    switch (status) {
      case 401:
        super('Your log in session has expired, please log in again')
        break
      default:
        super(message)
        break
    }
  }
}

export default HttpException
