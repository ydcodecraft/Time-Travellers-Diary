// set-env.ts

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import replace from 'replace-in-file';

// Load environment variables from .env file
dotenv.config();

// Path to the environment.ts file
const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// Read the environment.ts file
let envFileContent = fs.readFileSync(envFilePath, 'utf8');

// Define the replacements
const replacements: { [key: string]: string } = {
  'production: false,': `production: ${process.env.PRODUCTION},`,
  `'dev-ydcodecraft.ca.auth0.com',`: `'${process.env.AUTH0_DOMAIN}',`,
  `'BAWgx55vPLRKjhPM6lgldLqT9r3kWAPZ',`: `'${process.env.AUTH0_CLIENT_ID}',`,
  `'http://localhost:4200',`: `'${process.env.AUTH0_REDIRECT_URI}',`,
  `'https://dev-ydcodecraft.ca.auth0.com/api/v2/',`: `'${process.env.AUTH0_AUDIENCE}',`,
  `'http://127.0.0.1:8000',`: `'${process.env.BACKEND_URI}',`,
};

// Perform the replacements using replace-in-file
const options = {
  files: envFilePath,
  from: Object.keys(replacements).map(key => new RegExp(key, 'g')),
  to: Object.values(replacements),
};

try {
  const results = replace.sync(options);
  console.log('✅ Environment variables have been injected into environment.ts');
} catch (error) {
  console.error('❌ Error occurred while injecting environment variables:', error);
  process.exit(1);
}
