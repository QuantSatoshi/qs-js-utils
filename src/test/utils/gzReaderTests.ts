import test from 'ava';
import { GzReader } from '../../utils/gzReader';

test('gzReader stream pipe', async (t) => {
  function streamToString(stream: any) {
    const chunks: any = [];
    return new Promise((resolve) => {
      stream.on('data', (chunk: any) => chunk && chunks.push(JSON.parse(chunk.toString('utf8'))));
      stream.on('end', () => resolve(chunks));
    });
  }
  const gzReader = new GzReader(`${__dirname}/../../../src/test/utils/sampleData.gz`);
  const ret = await streamToString(gzReader.toStream());
  console.log(`debug ret`, ret);
  t.deepEqual(ret, [
    [1, 2, 3, 4, 5, 5],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 7],
    [1, 2, 3, 4, 5, 8],
    [1, 2, 3, 4, 5, 9],
  ]);
});

test('gzReader stream pipe with json parse', async (t) => {
  function streamToString(stream: any) {
    const chunks: any = [];
    return new Promise((resolve) => {
      stream.on('data', (chunk: any) => chunk && chunks.push(chunk));
      stream.on('end', () => resolve(chunks));
    });
  }
  const gzReader = new GzReader(`${__dirname}/../../../src/test/utils/sampleData.gz`);
  const ret = await streamToString(gzReader.toStream({ parseJSON: true }));
  t.deepEqual(ret, [
    [1, 2, 3, 4, 5, 5],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 7],
    [1, 2, 3, 4, 5, 8],
    [1, 2, 3, 4, 5, 9],
  ]);
});

test('gzReader toStream with error', async (t) => {
  function streamToString(stream: any) {
    const chunks: any = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: any) => chunks.push(chunk));
      stream.on('end', () => resolve(chunks));
      stream.on('error', (e: any) => reject(e));
    });
  }

  let exceptionOccurred = false;
  const gzReader = new GzReader(`${__dirname}/../../../src/test/utils/sampleDataPartial.gz`);
  try {
    const ret = await streamToString(gzReader.toStream({ parseJSON: false }));
  } catch (e) {
    console.log(`gzReader test error`, e);
    exceptionOccurred = true;
  }
  t.true(exceptionOccurred);
});

test('gzReader toStream with JSON error', async (t) => {
  function streamToString(stream: any) {
    const chunks: any = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: any) => chunks.push(chunk));
      stream.on('end', () => resolve(chunks));
      stream.on('error', (e: any) => reject(e));
    });
  }

  let exceptionOccurred = false;
  const gzReader = new GzReader(`${__dirname}/../../../src/test/utils/sampleDataPartial.gz`);
  try {
    const ret = await streamToString(gzReader.toStream({ parseJSON: true }));
  } catch (e) {
    console.log(`gzReader test error`, e);
    exceptionOccurred = true;
  }
  t.true(exceptionOccurred);
});
