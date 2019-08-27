const { getData } = require('../../utils/parser-log/index');

module.exports = {
  async index(request, response) {
    const data = await getData();
    console.time('data', data)
    console.timeEnd('data', data)
    console.log('\n', data)
    return response.json(data);
  }
};
