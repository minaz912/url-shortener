import request from 'supertest';
import { app, httpServer } from '../..';
import { inMemoryStore } from '../../store';

afterEach(() => {
  inMemoryStore.reset();
});

afterAll((done) => httpServer.close(done));

describe('[GET] - /decode', () => {
  it('Should decode shortened URL to full URL if it exists in store', async () => {
    inMemoryStore.storeValue(1, {
      originalURL: 'http://www.google.com/?q=test',
      shortenedURL: 'http://short.est/b',
    });
    inMemoryStore.storeValue(1, {
      originalURL: 'http://www.duckduckgo.com/?q=test',
      shortenedURL: 'http://short.est/c',
    });

    const res = await request(app).get('/decode').query({
      input: 'http://short.est/b',
    });

    expect(res.body.data).toMatchInlineSnapshot(
      `"http://www.duckduckgo.com/?q=test"`
    );
  });

  it('Should return null if shortened URL does not match any URL in store', async () => {
    const res = await request(app).get('/decode').query({
      input: 'http://short.est/b',
    });

    expect(res.body.data).toBeNull();
  });
});
