// set-env.js

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const replace = require('replace-in-file');

// Load environment variables from .env file
dotenv.config();

// Path to the environment.ts file
const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// Define the replacements
const replacements = [
  {
    from: /production: .*?,/g,
    to: `production: ${process.env.PRODUCTION},`,
  },
  {
    from: /domain: '.*?',/g,
    to: `domain: '${process.env.AUTH0_DOMAIN}',`,
  },
  {
    from: /clientId: '.*?',/g,
    to: `clientId: '${process.env.AUTH0_CLIENT_ID}',`,
  },
  {
    from: /redirect_uri: '.*?',/g,
    to: `redirect_uri: '${process.env.AUTH0_REDIRECT_URI}',`,
  },
  {
    from: /audience: '.*?'\s*,/g,
    to: `audience: '${process.env.AUTH0_AUDIENCE}',`,
  },
  {
    from: /uri: '.*?'\s*}/g,
    to: `uri: '${process.env.BACKEND_URI}'\n    }`,
  },
];

// Perform the replacements using replace-in-file
const options = {
  files: envFilePath,
  from: replacements.map(r => r.from),
  to: replacements.map(r => r.to),
};

try {
  replace.sync(options);
  console.log('✅ Environment variables have been injected into environment.ts');
} catch (error) {
  console.error('❌ Error injecting environment variables:', error);
  process.exit(1);
}
