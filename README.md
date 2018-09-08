# filmrausch api server

A simple server that can recieve and serve JSON.

## getting started

1. Install the dependencies by running ```npm install```.
2. Create a file called ```.env``` that contains all the necessary environment variables, in this case API_USER (the username) and API_PASS (the password).
These are being used to authenticate the POST requests with [basic auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).
It should look like this:  
  ```
  API_USER=your_username
  API_PASS=your_password
  ```  
  
3. To start the server for development, run ```npm run dev```. This will start [nodemon](https://github.com/remy/nodemon), which monitors any file changes and automatically restarts the server (very handy for development). To start the server for production, run ```npm start```.  
Both the production and the development server will listen on ```port 5000``` by default.
