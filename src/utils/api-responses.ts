interface ErrorType {
  msg: string;
}

export const success = (msg: string, data, statusCode: number) => {
  return {
    msg,
    data,
    status: statusCode,
  };
};

export const error = (msg: string, errors: ErrorType[], statusCode = 500) => {
  return {
    msg,
    errors,
    status: statusCode,
  };
};
