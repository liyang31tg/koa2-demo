export class Helper{

}

export class KoaErr extends Error {
  constructor ({ message = 'Error', status = 500 } = {}, ...args) {
    super()
    this.message = message
    this.status = status
    if (args.length > 0) {
      extend(this, args[0])
    }
  }
}