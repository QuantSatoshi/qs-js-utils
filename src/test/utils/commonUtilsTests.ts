import test from 'ava';
import { chunk } from '../../utils/commonUtils';

test('chunk', (t) => {
  t.deepEqual(chunk<number>([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
