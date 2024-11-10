// set-env.js

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

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
    from: /uri: '.*?'\s*\}/g,
    to: `uri: '${process.env.BACKEND_URI}'\n    }`,
  },
];

// Async IIFE to handle dynamic import
(async () => {
  try {
    // Dynamically import replace-in-file
    const replaceModule = await import('replace-in-file');
    const replace = replaceModule.default || replaceModule;

    // Perform the replacements using replace-in-file
    const options = {
      files: envFilePath,
      from: replacements.map(r => r.from),
      to: replacements.map(r => r.to),
    };

    await replace(options);
    console.log('✅ Environment variables have been injected into environment.ts');
  } catch (error) {
    console.error('❌ Error injecting environment variables:', error);
    process.exit(1);
  }
})();
