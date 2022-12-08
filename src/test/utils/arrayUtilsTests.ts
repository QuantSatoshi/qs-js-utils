import test from 'ava';
import { flatten, last } from '../../utils/arrayUtils';

test('flatten', (t) => {
  t.deepEqual(flatten<number>([[1, 2], [3, 4], [5]]), [1, 2, 3, 4, 5]);
});
test('last', (t) => {
  t.deepEqual(last<any>([[1, 2], [3, 4], [5]]), [5]);
});
