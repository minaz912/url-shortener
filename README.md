# URL Shortener

## Prerequisites for running the app locally

- node v12.17.0 or higher
- npm v6.14.8 or higher

## How to run

- Go to the root folder and install dependencies (if you haven't already done so) with `npm ci`
- Run `npm start`

## Building and running production

- Run `npm run build`, you'll see the transpiled output in the `dist` directory
- You can alternatively just run `npm run start:prod` to run in production mode

## Testing & Coverage

- Run `npm test` to run tests and collect coverage
- You can find the collected coverage in the generated `coverage` directory

## TODO

- Define a max URL length for inputs
- In-memory store could eventually run out of memory and crash the process (the `Map` memory usage is going to increase forever), as well as being reset on process restart/shutdown, an external key-value store or DB would be useful here
- OpenAPI spec
- Sanitize inputs or check against known malicious URL databases to prevent possible abuse by malicious actors
- Rate limiting or captcha to avoid/reduce spam
- Customize the base domain URL via env variables
- Set up a real logger and customize log levels
- Add Dockerfile
- Health-check endpoint (useful when running in a containerized setup)
- CI config
- Pre-commit hooks (linting, type-checks)
