export function hexStrToBuffer(hexStr: string) {
  const hexStrRaw = hexStr.match(/^0x/) ? hexStr.substring(2) : hexStr;
  return Buffer.from(hexStrRaw, 'hex');
}

export function bufferToBase64(buf: Buffer) {
  return buf.toString('base64');
}

export function bufferToHex(buf: Buffer) {
  return buf.toString('hex');
}

export function hexStrToBase64(hexStr: string) {
  return bufferToBase64(hexStrToBuffer(hexStr));
}

export function base64ToBuffer(base64: string) {
  return Buffer.from(base64, 'base64');
}

export function base64ToHexStr(base64: string) {
  return bufferToHex(base64ToBuffer(base64));
}
