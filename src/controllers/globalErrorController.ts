import express, { Request, Response, NextFunction } from 'express';

interface ErrorStr extends Error {
  statusCode?: number;
  status?: 'fail' | 'error';
  isOperational?: boolean;
}

const sendErrorDev = (res: Response, error: ErrorStr) => {
  res.status(error.statusCode ?? 500).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};

const sendErrorProd = (res: Response, error: ErrorStr) => {
  res.status(error.statusCode ?? 500).json({
    status: error.status,
    message: error.message,
  });
};

// Preserve prototype for instanceof checks
function cloneError(err: ErrorStr): ErrorStr {
  const cloned = Object.create(Object.getPrototypeOf(err));
  Object.assign(cloned, err);
  return cloned;
}

export default (
  err: ErrorStr,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = cloneError(err);

  error.statusCode = err.statusCode ?? 500;
  error.status = err.status ?? 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(res, error);
  } else {
    sendErrorProd(res, error);
  }
};
