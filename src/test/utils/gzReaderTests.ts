import test from 'ava';
import { GzReader } from '../../utils/gzReader';

test('gzReader stream pipe', async (t) => {
  function streamToString(stream: any) {
    const chunks: any = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: any) => chunks.push(JSON.parse(chunk.toString('utf8'))));
      stream.on('end', () => resolve(chunks));
    });
  }
  const gzReader = new GzReader(`${__dirname}/../../../src/test/utils/sampleData.gz`);
  const ret = await streamToString(gzReader.toStream());
  t.deepEqual(ret, [
    [1, 2, 3, 4, 5, 5],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 7],
    [1, 2, 3, 4, 5, 8],
    [1, 2, 3, 4, 5, 9],
  ]);
});
