import { POSSIBLE_CHARS } from '../constants';

interface DecodeFn {
  // eslint-disable-next-line no-unused-vars
  (valueToDecode: string): number;
}

interface Decoder {
  decode: DecodeFn;
}

class URLDecoder implements Decoder {
  private base = POSSIBLE_CHARS.length;

  decode(shortenedURL: string): number {
    let num = 0;

    for (let i = 0; i < shortenedURL.length; i += 1) {
      num = num * this.base + POSSIBLE_CHARS.indexOf(shortenedURL.charAt(i));
    }
    return num;
  }
}

export const urlDecoder = new URLDecoder();
