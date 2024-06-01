export default class RequestError extends Error {
  response: any;

  constructor(response: any) {
    super('');
    this.response = response;
  }
}
