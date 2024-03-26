import test from 'ava';
import { getSharpeRatio, shuffle } from '../../utils/mathUtils';

test('shuffle', (t) => {
  const arr = [1, 2, 3, 4, 5];
  console.log(`shuffle<number>([1, 2, 3, 4, 5])`, shuffle<number>(arr));
  t.pass();
});

test('getSharpeRatio', (t) => {
  const arr = [100, 100.1, 99.9, 100.2, 100.5, 101, 100.8, 102, 103];
  t.is(getSharpeRatio(arr).sharpeRatio, 13.67038728998157);
  t.is(getSharpeRatio(arr).dailyProfit, 0.003300291423638413);
});
