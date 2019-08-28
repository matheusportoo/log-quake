const fs = require('fs');
const path = require('path');
const ParserLog = require('../../utils/parser-log');
const { patterns, replaceLine } = require('../../utils/parser-log/utils');

const log = fs.readFileSync(path.resolve(__dirname, '../data/games.log'), 'utf8');
const result = [{
  game_1: {
    total_kills: 0,
    players: [ 'Isgalamido' ],
    kills: { Isgalamido: 0 }
  }
}, {
  game_2: {
    total_kills: 11,
    players: [ 'Isgalamido', 'Mocinha' ],
    kills: { Isgalamido: 0, Mocinha: 0 }
  }
}, {
  game_3: {
    total_kills: 4,
    players: [ 'Dono da Bola', 'Isgalamido', 'Zeh' ],
    kills: { 'Dono da Bola': 0, Isgalamido: 1, Zeh: 0 }
  }
}, {
  game_4: {
    total_kills: 105,
    players: [ 'Dono da Bola', 'Isgalamido', 'Zeh', 'Assasinu Credi' ],
    kills: { 'Dono da Bola': 13, Isgalamido: 19, Zeh: 20, 'Assasinu Credi': 13
  }
} }]

describe('Testing helper replaceLine', () => {

  describe(`\'Connect initing...\' - ${patterns.playerConnect}`, () => {
    test(`12:14 ClientConnect: 2 expected to be: 2`, () => {
      expect(replaceLine('12:14 ClientConnect: 2', patterns.playerConnect)).toBe('2');
    });

    test('0:59 ClientConnect: 3 expected to be: 3', () => {
      expect(replaceLine('0:59 ClientConnect: 3', patterns.playerConnect)).toBe('3');
    });

    test('10:05 ClientConnect: 4 expected to be: 4', () => {
      expect(replaceLine('10:05 ClientConnect: 4', patterns.playerConnect)).toBe('4');
    });
  });

  describe(`Player updating info...\' - ${patterns.playerInfoChanged}`, () => {
    test(String.raw`0:25 ClientUserinfoChanged: 2 n\Dono da Bola\t\0\model\sarge/krusade\hmodel\sarge/krusade\g_redteam\\g_blueteam\\c1\5\c2\5\hc\95\w\0\l\0\tt\0\tl\0 expected to be: 2 n\Dono da Bola`, () => {
      expect(replaceLine(String.raw`0:25 ClientUserinfoChanged: 2 n\Dono da Bola\t\0\model\sarge/krusade\hmodel\sarge/krusade\g_redteam\\g_blueteam\\c1\5\c2\5\hc\95\w\0\l\0\tt\0\tl\0`, patterns.playerInfoChanged)).toBe(String.raw`2 n\Dono da Bola`);
    });

    test(String.raw`0:59 ClientUserinfoChanged: 3 n\Isgalamido\t\0\model\xian/default\hmodel\xian/default\g_redteam\\g_blueteam\\c1\4\c2\5\hc\100\w\0\l\0\tt\0\tl\0 expected to be: 3 n\Isgalamido`, () => {
      expect(replaceLine(String.raw`0:59 ClientUserinfoChanged: 3 n\Isgalamido\t\0\model\xian/default\hmodel\xian/default\g_redteam\\g_blueteam\\c1\4\c2\5\hc\100\w\0\l\0\tt\0\tl\0`, patterns.playerInfoChanged)).toBe(String.raw`3 n\Isgalamido`);
    });
  });

  describe(`\'Killers...\' - ${patterns.killers}`, () => {
    test('1:08 Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET expected to be: 3 2 6: Isgalamido killed Mocinha', () => {
      expect(replaceLine('1:08 Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET', patterns.killers)).toBe('3 2 6: Isgalamido killed Mocinha');
    });

    test('1:26 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT to be 1022 4 22: <world> killed Zeh', () => {
      expect(replaceLine('1:26 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT', patterns.killers)).toBe('1022 4 22: <world> killed Zeh');
    });

    test('  9:21 Kill: 1022 5 22: <world> killed Dono da Bola by MOD_TRIGGER_HURT expected to be: 1022 5 22: <world> killed Dono da Bola', () => {
      expect(replaceLine('  9:21 Kill: 1022 5 22: <world> killed Dono da Bola by MOD_TRIGGER_HURT', patterns.killers)).toBe('1022 5 22: <world> killed Dono da Bola');
    });
  });

});

describe('Testing class ParserLog', () => {
  test('Receive a file log, expected a return of data: [{ game_1: { total_kills: 0, players: [ \'Isgalamido\' ], kills: { Isgalamido: 0  } } }]', () => {
    const parserLog = new ParserLog(log);
    const games = parserLog.getGames();

    expect(games).toStrictEqual(result);
  });
});
