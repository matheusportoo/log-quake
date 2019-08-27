const log = (request, response, next) => {
  console.log(`\n.::Request Info::\ntype: '${request.method}' || path: '${request.path}'\n`);

  return next();
}

module.exports = log;
