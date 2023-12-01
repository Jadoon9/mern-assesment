class HTTPError extends Error {
  code: number;
  details: any[];

  constructor(message = "Error", errorCode: number, details: any[] = []) {
    super();
    this.message = message;
    this.code = errorCode;
    this.details = details;
  }
}

class HTTPResponse {
  message: string;
  data: any;

  constructor(message: string = "Success", data: any) {
    this.message = message;
    this.data = data;
  }
}

export { HTTPError, HTTPResponse };
