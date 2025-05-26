/* eslint-disable no-unused-vars */
const { isCelebrateError } = require("celebrate");
const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ConnectionError,
  TimeoutError,
  BaseError,
} = require("sequelize");
const multer = require("multer");
const { clearUploadedFiles, logError } = require("./common");

// Handle error log
function handleErrorLog(err, status) {
  if (status === 500 || status === 502 || status === 503) {
    logError(err);
  }
}

// Handle multer error
function multerErrorHandler(err, res) {
  return res.status(400).json({
    status: false,
    error: err.message,
  });
}

// Handle Sequelize Error
function databaseErrorHandler(err, res) {
  if (err instanceof ConnectionError || err instanceof TimeoutError) {
    return res.status(503).json({
      status: false,
      error: "Database connection issue. Please try again later.",
    });
  }

  if (err instanceof UniqueConstraintError) {
    const message = err.errors.map((e) => e.message).join(", ");
    return res.status(400).json({
      status: false,
      error: message,
    });
  }

  if (err instanceof ValidationError) {
    const message = err.errors.map((e) => e.message).join(", ");
    return res.status(400).json({
      status: false,
      error: message,
    });
  }

  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      status: false,
      error: "Foreign key constraint violation",
    });
  }

  // unexpected sequilize error
  // log error
  handleErrorLog(err.original);

  res.status(500).json({
    status: false,
    error: err.message,
  });
}

// Handle Celebrate validation error
function validationErrorHandler(err, res) {
  const error = [];
  for (const [, joiError] of err.details.entries()) {
    error.push(joiError.message);
  }

  const message = error.map((e) => e.split('"').join("")).join(", ");

  return res.status(400).json({
    status: false,
    error: message,
  });
}

const handleError = (err, req, res, next) => {
  //clean if any file already uploaded
  clearUploadedFiles(req.files, req.file);

  // Handle Sequelize Error
  if (err instanceof BaseError) {
    return databaseErrorHandler(err, res);
  }

  // Handle multer error
  if (err instanceof multer.MulterError) {
    return multerErrorHandler(err, res);
  }

  // Handle validation error
  if (isCelebrateError(err)) {
    return validationErrorHandler(err, res);
  }

  // Handle server error
  let message;
  let status;

  if (!err.statusCode || !err.message) {
    status = err.statusCode || 500;
    message = err.message || "Server error. Please try again later.";
  } else {
    message = err.message;
    status = err.statusCode;
  }

  // log error
  handleErrorLog(err, status);

  res.status(status).json({
    status: false,
    error: message,
  });
};

module.exports = {
  handleError,
};
