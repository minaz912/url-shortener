import request from 'supertest';
import { app } from '../..';
import { inMemoryStore } from '../../store';

afterEach(() => {
  inMemoryStore.reset();
});

describe('[POST] - /encode', () => {
  it('Should encode full URL to shortened URL', async () => {
    const res = await request(app).post('/encode').send({
      input: 'http://www.google.com/?q=test',
    });

    expect(res.body.data).toMatchInlineSnapshot(`
      Object {
        "originalURL": "http://www.google.com/?q=test",
        "shortenedURL": "http://short.est/b",
      }
    `);
  });

  it('Should not reuse the same shortened URL for the same input', async () => {
    const firstRes = await request(app).post('/encode').send({
      input: 'http://www.google.com/?q=test',
    });

    const { shortenedURL } = firstRes.body.data;

    const secondRes = await request(app).post('/encode').send({
      input: 'http://www.google.com/?q=test',
    });

    expect(secondRes.body.data.shortenedURL).not.toBe(shortenedURL);
  });
});
