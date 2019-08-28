module.exports = {
  initGame: /\d{1,3}:\d{1,2} InitGame:/g,
  playerConnect: /\d{1,3}:\d{1,2} ClientConnect:/g,
  playerInfoChanged: /(\d{1,3}:\d{1,2} ClientUserinfoChanged:)|(\\t\\\d{1,}.*\\\d{1,})/g,
  killers: /(\d{1,3}:\d{1,2} Kill:)|(by.*)/g
};
