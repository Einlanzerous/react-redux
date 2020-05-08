# auth_server
 JWT based authorization server

# How to Run/Use
Need to connect to a MongoDB source- be it local or through online options

Change 'mongoDBUrl' in index.js to have the correct url. 
Create a creds.js file in root, and have username/password for read/write user to MongoDB.
In the above file, add a secret string for auth purposes.

npm run nodemon will start the server and watch for changes. By default, it will run on port 3090 locally. 

# Auth - JWT or Local
Using postman, you can hit '/signup' with username and password in the body (password needs to be 8 characters or longer, username should be an e-mail which is unique in the MongoDB). You will recieve a token after creation.

Once an account exists, you can also hit '/signin' with correct username and password to recieve a token.

Armed with a token, you can hit '/' with an authorization header which includes your token.
