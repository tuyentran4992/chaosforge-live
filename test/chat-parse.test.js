import test from 'node:test';
import assert from 'node:assert/strict';
import { createIrcParser, parseCommand, parseIrcLine } from '../client/chat/parse.js';

test('commands, votes and emotes have explicit event shapes', () => {
  assert.deepEqual(parseCommand('!forge Exploding ducks'), [{ type: 'forge', idea: 'Exploding ducks' }]);
  assert.deepEqual(parseCommand('!forge   '), []);
  assert.deepEqual(parseCommand('!shield'), [{ type: 'shield' }]);
  assert.deepEqual(parseCommand('!boost'), [{ type: 'boost' }]);
  assert.deepEqual(parseCommand('1 1 1 vote 1!'), [{ type: 'vote', choice: 1 }]);
  assert.deepEqual(parseCommand('2'), [{ type: 'vote', choice: 2 }]);
  assert.deepEqual(parseCommand('3'), [{ type: 'vote', choice: 3 }]);
  assert.deepEqual(parseCommand('1 or 2'), []);
  assert.deepEqual(parseCommand('LUL PogChamp'), [
    { type: 'emote', emote: 'LUL' }, { type: 'emote', emote: 'PogChamp' },
  ]);
  assert.deepEqual(parseCommand('notLUL 123'), []);
});

test('IRC handles tagged messages, PING, batches and fragmented frames', () => {
  const parser = createIrcParser();
  assert.deepEqual(parser.push('PING :tmi.twitch.tv\r\n@badge=1 :viewer!v@h PRIVMSG #channel :!for'), [
    { type: 'ping', payload: 'tmi.twitch.tv' },
  ]);
  assert.deepEqual(parser.push('ge flying ducks\r\n:other!o@h PRIVMSG #channel :PogChamp\r\n'), [
    { type: 'message', user: 'viewer', channel: '#channel', text: '!forge flying ducks',
      events: [{ type: 'forge', idea: 'flying ducks' }] },
    { type: 'message', user: 'other', channel: '#channel', text: 'PogChamp',
      events: [{ type: 'emote', emote: 'PogChamp' }] },
  ]);
  assert.equal(parseIrcLine(':server NOTICE * :hello'), null);
});

test('overlong IRC frames are discarded and parser resumes next frame', () => {
  const parser = createIrcParser();
  assert.deepEqual(parser.push('x'.repeat(17000)), []);
  assert.deepEqual(parser.push('ignored\r\nPING :next\r\n'), [{ type: 'ping', payload: 'next' }]);
  assert.throws(() => parser.push(null), TypeError);
});
