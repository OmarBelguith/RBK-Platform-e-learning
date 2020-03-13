module.exports = {
  createError({ details, code, message, type }) {
    const error = {};
    error.details = details;
    error.code = code;
    error.message = message;
    error.type = type;
    throw error;
  },
  createValidationError({ details, message, type }) {
    this.createError({
      message: message || "Validation Error",
      code: 400,
      details: details,
      type: type || "ValidationError"
    });
  },
  createTokenError({ message, details, type }) {
    this.createError({
      message: message || "Token Error",
      code: 401,
      details: details,
      type: type || "TokenError"
    });
  },
  createAuthorizationError({ message, details, type }) {
    this.createError({
      message: message || "Unauthorized Action",
      code: 403,
      details: details,
      type: type || "UnauthorizedAction"
    });
  },
  createModelNotFoundError({ message, details, type }) {
    this.createError({
      details: details,
      code: 404,
      message: message || "Model Not Found Error",
      type: type || "ModelNotFoundError"
    });
  }
};
