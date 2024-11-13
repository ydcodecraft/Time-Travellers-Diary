Live URL: https://time-travellers-diary.vercel.app \
Live API swagger doc: https://ydcodecraft.pythonanywhere.com/swagger/#/

# Getting Started
1. Git clone everything!
## Frontend build
1. Frontend requires an .env to dynamically inject environment variables into environment.ts. You will receive this file in the email.'
2. Frontend requires a generated npm SDK which is published to this repo, you will require a .npmrc file to gain access, you will recieve this file in the email.
3. Put both .env and .npmrc file at the root folder
4. At the angular root folder, run npm install
5. npm start

## Backend build
1. create a virtual environment with python 3.10
2. activate the virtual environment
3. at time_traveller_diary root folder, python manage.py migrate
4. python manage.py runserver

# Tech Stack
Front-End Framework - Angular\
Back-End Framework - Django Rest Framework\
Identity Management and Auth Platform - Auth0\
Version Control - GitHub\
CI/CD Pipeline - GitHub Actions
~~ Containerization - Docker ~~ didn't have enough time to get this done\
Frontend hosting - Vercel 
Backend Hosting - PythonAnywhere\
Database - MySQL (Free on PythonAnywhere and faster than SQLLite)

## Client Side
Angular 18 standalone with Material library
I chose Material because it's a quick cookie-cutter component library. If I have the time, I would also work with custom SCSS or tailwind to introduce more customization to the UI
I set up 2 environments on Vercel, the master branch will release the app to PRD and other feature branches will release to DEV (Preview). Ideally, I would also add testing and staging environment for a complete SDLC

## Server Side
MySql hosted on PythonAnywhere
Django ORM creating the models and relationships
Django Rest Framework creating the serialziers and serving the API

The Deployment of this is manual, it's old school VM deployment and I didn't have the time to find out how to orchestrate automatic deployment from Github Actions

## CI/CD
1. Building the backend Django Rest Framework app
2. Generate the OpenAPI spec in yaml
3. run OpenAPI Cli tool to generate the angular package
4. Publish the npm angular package to the same GitHub Repo
5. Deploy Angular site to Vercel automatically on git push or PR
  

## Authentication/Authorization
Authorization Code with PKCE Grant Flow - Ideal for direct PW login and social login
Detailed Workflow
1. Unauthorized user will be sent to the login page from angular frontend to auth0
2. Unauthorized user register/login with PW or social login
3. Auth0 sent authorized user to callback url with auth code
4. Angular frontend exchange the auth code for access token
5. Requests from authorized user will have access token included in the header when it gets sent to the Django Rest Framework(DRF) backend
6. DRF backend validates the incoming access token against auth0, validate the claims and scopes(in this project i didn't set detailed scopes of access)
7. auth process completes and DRF backend sends response back to Angular frontend 

#Issues and Improvements
1. not optimized for ultrawide and larger screens like 4K
2. Soft delete: I wanted to implement soft delete for my diary objects. I set up the column "is_active" but didn't have the time to complete the feature at the front end. Choosing soft delete is beneficial without losing user data

