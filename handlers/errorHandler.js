exports.catchErrors = (fn) => {
    return function (req, res, next) {
      const resp = fn(req, res, next);
      console.log("resp -->",resp)
      if (resp instanceof Promise) {
        return resp.catch(next);
      }
      return resp;
    };
  };
  
  /*
    Not Found Error Handler
  
    If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
  */
  exports.notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: "Api url doesn't exist ",
    });
  };
  
  /*
    Development Error Handler
  
    In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
  */
  exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || "";
    const errorDetails = {
      message: err.message,
      status: err.status,
      stackHighlighted: err.stack.replace(
        /[a-z_-\d]+.js:\d+:\d+/gi,
        "<mark>$&</mark>"
      ),
    };
  
    res.status(500).json({
      success: false,
      message: "Oops ! Error in Server",
    });
  };
  
  /*
    Production Error Handler
  
    No stacktraces are leaked to admin
  */
  exports.productionErrors = (err, req, res, next) => {
    res.status(500).json({
      success: false,
      message: "Oops ! Error in Server",
    });
  };