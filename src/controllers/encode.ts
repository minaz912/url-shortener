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
  res: Response
) {
  const { input } = req.body;

  const id = inMemoryStore.getGeneratedId();
  const shortenedURL = urlEncoder.encode(id);

  const mappedURL = inMemoryStore.storeValue(id, {
    originalURL: input,
    shortenedURL,
  });

  return res.json({ data: mappedURL });
}
