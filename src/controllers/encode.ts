import { Request, Response } from 'express';
import { inMemoryStore } from '../store';
import { urlEncoder } from '../utils';

type EncodeResponse = {
  data: string;
};

type EncodeBody = {
  input: string;
};

export async function encode(
  req: Request<null, EncodeResponse, EncodeBody>,
  res: Response<EncodeResponse>
) {
  const { input } = req.body;

  /**
   * get a "unique" ID from the store
   * we will encode this and use it to map
   * the full URL to a short URL
   */
  const id = inMemoryStore.getGeneratedId();
  const shortenedURL = urlEncoder.encode(id);

  const mappedURL = inMemoryStore.storeValue(id, {
    originalURL: input,
    shortenedURL,
  });

  return res.json({ data: mappedURL.shortenedURL });
}
