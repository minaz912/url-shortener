import { BASE_DOMAIN, POSSIBLE_CHARS } from '../constants';

interface EncodeFn {
  // eslint-disable-next-line no-unused-vars
  (id: number): string;
}

interface Encoder {
  encode: EncodeFn;
}

class URLEncoder implements Encoder {
  private base = POSSIBLE_CHARS.length;

  encode(id: number): string {
    let shortenedURL = '';
    let num = id;
    while (num > 0) {
      shortenedURL = POSSIBLE_CHARS.charAt(num % this.base) + shortenedURL;
      num = Math.floor(num / this.base);
    }
    return `${BASE_DOMAIN}/${shortenedURL}`;
  }
}

export const urlEncoder = new URLEncoder();
