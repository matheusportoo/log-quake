module.exports = {
  initGame: /\d{1,3}:\d{1,2} InitGame:/g,
  player: /(\d{1,3}:\d{1,2} ClientUserinfoChanged:)|(\\t\\\d{1,}.*\\\d{1,})/g,
  killers: /(\d{1,3}:\d{1,2} Kill:.*:)|(killed)|(by.*)/g
};
