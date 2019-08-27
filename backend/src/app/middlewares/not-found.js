const notFound = (request, response) => {
  return response.status(404).json({
    error: 'not found'
  })
}

module.exports = notFound;
