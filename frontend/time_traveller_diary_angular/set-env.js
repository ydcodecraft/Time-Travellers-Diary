// set-env.js

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Validate that all required environment variables are set
const requiredVars = [
  'PRODUCTION',
  'AUTH0_DOMAIN',
  'AUTH0_CLIENT_ID',
  'AUTH0_REDIRECT_URI',
  'AUTH0_AUDIENCE',
  'BACKEND_URI'
];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Error: Environment variable ${varName} is not set.`);
    process.exit(1);
  }
});

// Paths to the template and target environment files
const templatePath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');
const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// Read the template file
let envTemplate = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders with actual environment variables
envTemplate = envTemplate
  .replace(/\${PRODUCTION}/g, process.env['PRODUCTION'] === 'true' ? 'true' : 'false')
  .replace(/\${AUTH0_DOMAIN}/g, process.env['AUTH0_DOMAIN'] || '')
  .replace(/\${AUTH0_CLIENT_ID}/g, process.env['AUTH0_CLIENT_ID'] || '')
  .replace(/\${AUTH0_REDIRECT_URI}/g, process.env['AUTH0_REDIRECT_URI'] || '')
  .replace(/\${AUTH0_AUDIENCE}/g, process.env['AUTH0_AUDIENCE'] || '')
  .replace(/\${BACKEND_URI}/g, process.env['BACKEND_URI'] || '')
  .replace(/\${NPM_PKG_AITHUB_AUTH_TOKEN}/g, process.env['NPM_PKG_AITHUB_AUTH_TOKEN'] || '');

// Write the updated environment.ts file
fs.writeFileSync(envFilePath, envTemplate, 'utf8');

console.log('✅ environment.ts has been generated from the template with environment variables.');
