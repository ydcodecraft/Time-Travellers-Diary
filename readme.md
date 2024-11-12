Live URL: https://time-travellers-diary.vercel.app
Live API swagger doc: https://ydcodecraft.pythonanywhere.com/swagger/#/

# Getting Started
1. Git clone everything!
## Frontend build
1. Frontend requires an .env to dynamically inject environment variables into environment.ts. You will receive this file in the email.
2. at the angular root folder, npm install
3. npm start

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
CI/CD Pipeline - GitHub Actions - TODO\
~~ Containerization - Docker ~~ didn't have enough time to get this done\
Frontend hosting - Vercel 
Backend Hosting - PythonAnywhere\
Database - MySQL (Free on PythonAnywhere and faster than SQLLite)

## Client Side
Angular 18 standalone

## Server Side
MySql hosted on PythonAnywhere
Django ORM creating the models and relationships
Django Rest Framework creating the serialziers and serving the API


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
2. 
