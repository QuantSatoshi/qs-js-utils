import test from 'ava';
import { base64ToHexStr, bufferToBase64, hexStrToBase64, hexStrToBuffer } from '../../utils/binaryUtils';

test('hexStrToBuffer', (t) => {
  t.deepEqual(hexStrToBuffer('0x0a1f').toString('hex'), '0a1f');
  t.deepEqual(hexStrToBuffer('0a1f').toString('hex'), '0a1f');
});
test('bufferToBase64', (t) => {
  const buf = hexStrToBuffer('0x0a1f');
  t.deepEqual(bufferToBase64(buf), 'Ch8=');
});
test('base64ToHexStr', (t) => {
  t.deepEqual(base64ToHexStr('Ch8='), '0a1f');
});
test('hexStrToBase64', (t) => {
  t.deepEqual(hexStrToBase64('0a1f'), 'Ch8=');
});
