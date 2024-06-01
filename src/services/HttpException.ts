class HttpException extends Error {
  constructor(status: number, message: string) {
    switch (status) {
      case 401:
        super('Your login session has expired, please login again')
        break;
      default:
        super(message)
        break;
    }
  }
}