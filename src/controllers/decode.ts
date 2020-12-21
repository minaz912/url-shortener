import { Request, Response } from 'express';
import { BASE_DOMAIN } from '../constants';
import { inMemoryStore } from '../store';
import { urlDecoder } from '../utils';

type DecodeQuery = {
  input: string;
};

type DecodeResponse = {
  data: string | null;
};

export async function decode(
  req: Request<null, null, null, DecodeQuery>,
  res: Response<DecodeResponse>
) {
  const { input } = req.query;

  /**
   * we assume the shortened URL is passed alongside the domain (not just the shortened segment), so we remove the base domain URL if it exists
   */
  const inputWithoutBaseDomain = input.replace(`${BASE_DOMAIN}/`, '');

  /**
   * get numerical ID from the shortened URL segment
   */
  const id = urlDecoder.decode(inputWithoutBaseDomain);
  const mappedURL = inMemoryStore.lookupValueById(id);

  return res.json({
    data: mappedURL === null ? mappedURL : mappedURL.originalURL,
  });
}
