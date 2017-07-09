module.exports = {
  sendError: (res, err) => {
    res.status(err && err.status ? err.status : 500).send({
      message: err && err.message ? err.message : 'Internal server error'
    });
  }
}