import test from 'ava';
import { shuffle } from '../../utils/mathUtils';

test('shuffle', (t) => {
  const arr = [1, 2, 3, 4, 5];
  console.log(`shuffle<number>([1, 2, 3, 4, 5])`, shuffle<number>(arr));
  t.pass();
});
