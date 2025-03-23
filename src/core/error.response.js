
const StatusCode={
    Fobidden:403,
    Conflict:409,
}
const ReasonStatusCode={
    Fobidden:"Bad Request",
    Conflict:"Conflict",
}

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

}
class ConflictRequestError extends ErrorResponse {
  constructor(message= ReasonStatusCode.Conflict, statusCode=StatusCode.Fobidden) {
    super(message, statusCode);
  }

}
class BadRequestError extends ErrorResponse {
    constructor(message= ReasonStatusCode.Conflict, statusCode=StatusCode.Fobidden) {
      super(message, statusCode);
    }
  
  }
module.exports = {
    ConflictRequestError,
    BadRequestError
}