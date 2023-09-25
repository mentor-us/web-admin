# Install

## Prerequisite
- Install Visual Studio Code: https://code.visualstudio.com/download
- Install NodeJS: https://nodejs.org/en/download
  - Checking NodeJS installed correctly: `node -v`
  - Checking NPM installed correctly: `npm -v`

## Start the project on local server
- Run backend server local
- Open the project: `cd <project folder>/src`
- Install dependencies: `npm install`
- Configure vars in `.env` file
  - `REACT_APP_BACKEND_URL = 'http://localhost:8080/'` - Url to BE Server on local 
  - `REACT_APP_WEB_URL = 'http://localhost:3000/'` - Url to FE Server on local
- Run the project: `npm start`
- Open the project in browser: http://localhost:3000

## Deploy the project on dev server with Docker
- Configure vars in `.env.dev` file
  - `REACT_APP_BACKEND_URL = 'http://157.245.155.114:7000/'` - Url to BE Server on dev server 
  - `REACT_APP_WEB_URL = 'http://157.245.155.114:7002/'` - Url to FE Server on dev server
- Open the project: `cd <project folder>/src`
- Build docker image: `docker build -t mentorus-web-admin:0.0.1 .`
- Start docker container: `docker run -d --restart always --name mentorus-web-admin --network mentorus-network -p 7002:80 mentorus-web-admin:0.0.1`

- Stop docker container: `docker stop mentorus-web-admin && docker rm mentorus-web-admin`
  
<b>Note: <b> All the command above run on remote dev server

## Errors (if any)
- Error: [BABEL] ... Cannot find module '@babel/plugin-proposal-private-property-in-object' ...
  - Solution: 
    - Delete `node_modules` folder
    - Delete `package-lock.json` file
    - Run `npm install`
    - Retry `npm start`