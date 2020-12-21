import { BASE_DOMAIN, POSSIBLE_CHARS } from '../constants';

interface EncodeFn {
  // eslint-disable-next-line no-unused-vars
  (id: number): string;
}

interface Encoder {
  encode: EncodeFn;
}

class URLEncoder implements Encoder {
  encode(id: number): string {
    let shortenedURL = '';
    let num = id;
    const base = POSSIBLE_CHARS.length;
    while (num > 0) {
      shortenedURL = POSSIBLE_CHARS.charAt(num % base) + shortenedURL;
      num = Math.floor(num / base);
    }
    return `${BASE_DOMAIN}/${shortenedURL}`;
  }
}

export const urlEncoder = new URLEncoder();
