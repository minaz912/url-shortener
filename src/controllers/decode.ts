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

  const inputWithoutBaseDomain = input.replace(`${BASE_DOMAIN}/`, '');

  const id = urlDecoder.decode(inputWithoutBaseDomain);
  const mappedURL = inMemoryStore.lookupValueById(id);

  return res.json({
    data: mappedURL === null ? mappedURL : mappedURL.originalURL,
  });
}
