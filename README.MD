## usage
```
yarn add qs-js-lib

import { gzReader } from 'qs-js-utils';

const reader = new GzReader(fileName);
    await reader.readStream(data => {
    return onDataRow(data);
});

import { getDay } from 'qs-js-utils';

getDay('2021-06-27T00:00:00.000Z') // = 2021-06-27


isTimeWithinRange(new Date(), 3000) // check if a certain date object is within recent time window
```

### use gzWriter
```
const gzWriter = new GzWriter(`./fileName.gz`);
const data = [123, 456]
await gzWriter.writeMany(data);
gzWriter.end();
await gzWriter.waitForFinish();
```
