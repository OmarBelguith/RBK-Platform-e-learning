/**
  * This middleware will handle the errors that don't get caught by any layer or any other middleware. 
  * if any middleware as 4 parameters, express would recognize it as an error handler middleware and will pass the error as first argument
  * and the rest as the usual arguments
	* @param error 
	* @param req 
	* @param res 
	* @param next 
	* @returns {Promise<void>} 
*/ 
module.exports = async (error, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    console.error(error);
  }
  res.status(error.code || 500).json({
    type: error.type || error.code,
    message: error.message || "ServerError",
    stack: error.stack || [],
    details: error.details || ""
  });
};
