Front-End Framework - Angular\
Back-End Framework - Django Rest Framework\
Identity Management and Auth Platform - Auth0\
Version Control - GitHub\
CI/CD Pipeline - GitHub Actions\
Containerization - Docker\
Hosting Environment - PythonAnywhere\
Database - MySQL (Free on PythonAnywhere and faster than SQLLite)

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


