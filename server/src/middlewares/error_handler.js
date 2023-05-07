const errorHandler = (error, req, res, next) => {
 console.log(error.stack)
 return res.status(500).json({
  status: 500,
  method: req.method,
  path: req.url,
  response: error.toString()
 })
}

export default errorHandler

// res.send({
//  status: 500,
//  success: false,
//  error: err.toString()
// })
