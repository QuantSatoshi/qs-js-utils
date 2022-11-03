import test from 'ava';
import * as searchUtils from '../../utils/searchUtils';

const ob = {
  bids: [
    { a: 3, r: 7002 },
    { a: 21, r: 7001 },
    { a: 26, r: 7000.5 },
    { a: 5, r: 7000 },
  ],
  asks: [
    { a: 3, r: 7002.5 },
    { a: 21, r: 7009 },
    { a: 26, r: 7010.5 },
    { a: 5, r: 7011 },
  ],
};

test('sortedFindFirstGreater', (t) => {
  t.is(
    searchUtils.sortedFindFirstGreater(ob.asks, 7010, (ob) => ob.r),
    2,
  );
  t.is(
    searchUtils.sortedFindFirstGreater(ob.asks, 7009, (ob) => ob.r),
    2,
  );
  t.is(
    searchUtils.sortedFindFirstGreater(ob.asks, 7020, (ob) => ob.r),
    -1,
  );
  const error: any = t.throws(() => {
    searchUtils.sortedFindFirstGreater(ob.bids, 7000, (ob) => ob.r);
  });
  t.is(error.message, 'sortedFindFirstGreater requires data to be sorted ascending');
});

test(`sortedFindFirstGreaterEqual found equal index`, (t) => {
  t.is(
    searchUtils.sortedFindFirstGreaterEqual(ob.asks, 7009, (ob) => ob.r),
    1,
  );
});

test(`sortedFindFirstGreaterEqual last index`, (t) => {
  t.is(
    searchUtils.sortedFindFirstGreaterEqual(
      [
        { r: 152.48, a: 8.18084404 },
        { r: 152.49, a: 14.31512963 },
        { r: 152.5, a: 25.52159388 },
        { r: 152.51, a: 6 },
        { r: 152.53, a: 70 },
      ],
      152.52,
      (ob) => ob.r,
    ),
    4,
  );
});

test(`sortedFindFirstSmaller`, (t) => {
  t.is(
    searchUtils.sortedFindFirstSmaller(ob.bids, 7001.5, (ob) => ob.r),
    1,
  );
  t.is(
    searchUtils.sortedFindFirstSmaller(ob.bids, 7001, (ob) => ob.r),
    2,
  );
  t.is(
    searchUtils.sortedFindFirstSmaller(ob.bids, 6555, (ob) => ob.r),
    -1,
  );

  const err: any = t.throws(() => {
    searchUtils.sortedFindFirstSmaller(ob.asks, 7000, (ob) => ob.r);
  });
  t.truthy(err.message);
});

test(`sortedFindFirstSmallerEqual found equal index`, (t) => {
  t.is(
    searchUtils.sortedFindFirstSmallerEqual(ob.bids, 7001, (ob) => ob.r),
    1,
  );
});

test(`sortedFindFirstSmallerEqual found one match equal`, (t) => {
  t.is(
    searchUtils.sortedFindFirstSmallerEqual([{ r: 7001, a: 1 }], 7001, (ob) => ob.r),
    0,
  );
});

test(`sortedFindFirstSmallerEqual found one match smaller`, (t) => {
  t.is(
    searchUtils.sortedFindFirstSmallerEqual([{ r: 7001, a: 1 }], 7002, (ob) => ob.r),
    0,
  );
});

test(`sortedFindFirstSmallerEqual found one no match`, (t) => {
  t.is(
    searchUtils.sortedFindFirstSmallerEqual([{ r: 7001, a: 1 }], 7000, (ob) => ob.r),
    -1,
  );
});

test(`sortedFindFirstSmallerEqual last index`, (t) => {
  t.is(
    searchUtils.sortedFindFirstSmallerEqual(
      [
        { r: 152.5, a: 8.18084404 },
        { r: 152.4, a: 14.31512963 },
        { r: 152.3, a: 25.52159388 },
        { r: 152.2, a: 6 },
        { r: 152.15, a: 70 },
      ],
      152.18,
      (ob) => ob.r,
    ),
    4,
  );
});
