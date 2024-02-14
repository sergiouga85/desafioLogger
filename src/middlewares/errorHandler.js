/*export function errorHandler(error, req, res, next) {
    if (error.message === 'not found') {
      res.status(404)
    } else if (error.message === 'not found') {
      res.status(404)
    } else {
      res.status(500)
    }
    console.log(error)
  
    res.json({
      status: 'error',
      message: error.message,
    })
  }*/

  export function errorHandler(error, req, res, next) {
    req.logger.error(error.message)
    // manejo los errores segun su tipo
    next(error)
  }