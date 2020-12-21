interface DecodeFn {
  // eslint-disable-next-line no-unused-vars
  (valueToDecode: string): number;
}

interface Encoder {
  decode: DecodeFn;
}

class URLDecoder implements Encoder {
  decode(shortenedURL: string): number {
    // TODO: implement this
    return 1;
  }
}

export const urlDecoder = new URLDecoder();
