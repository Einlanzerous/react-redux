This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Website with Boilerplate auth attached
Basically playing around with react-redux to create a client/server model to handle auth using previously made auth_server from here https://github.com/Einlanzerous/auth_server

## To run

Obviously you need to run npm/yarn install for both client and server. Similarly, you can look in the README.md for the server, but you will need a MongoDB (I used mLab) host and credentials for at least read/write. 

# Start the server (defaults to port 3090)
cd ./server | npm run nodemon (PS)
cd ./server && npm run nodemon (unix)

# Start the client (defaults to port 3000)
cd ./client | npm start (PS)
cd ./client && npm start (unix)


TODOs: At some point I'll remove passport usage for just plain Node usage for server side