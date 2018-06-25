# filmrausch api server

A simple server that can recieve and serve JSON.

## getting started

1. Install the dependencies by running ```npm install```.
2. Create a file called ```.env``` that contains all the necessary environment variables, in this case USER and PASS.
These are being used to authenticate the POST requests with [basic auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).
It should look like this:  
  ```
  USER=your_username
  PASS=your_password
  ```  
  
3. To start the server for development run ```npm run dev```. This will start nodemon which watches the files and restarts the server
everytime you save your changes. To start the server for production, run ```npm start```.
Both will start a server that listens on ```port 5000``` by default.
