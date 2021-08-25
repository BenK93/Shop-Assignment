# Shopping Example
### Shop with dummy products. And Login/Register for new users.
--- 
#### Ragistering a new user:
> curl -X POST -d "password=<your_password>&fullName=<your_fullName>&email=<your_email>&isAdmin=<true/false>" http://127.0.0.1:5000/api/users/register/
> 
#### Logging In
> curl -X POST -d "password=<your_password>&username=<your_email>" https://messaging-django.herokuapp.com/api/users/registration
* Notice that in username you should pass your Email!
##### Respond if Valid:
> { "token" : "your_token", isAdmin: "true/false", "email": "your_email" }

### Except Registration & Login ALL endpoints require Authorization header
- "Authorization" : "Bearer <your_token>"


## Installation locally:
1. git clone REPOSITORY
2. cd repository
3. npm install
4. cd repository/frontend
5. npm install
6. npm start
7. cd ../ && npm start (from backend)
   
* Frontend will be available on `http://localhost:3000`
* Backend will be available on `http://localhost:5000`


