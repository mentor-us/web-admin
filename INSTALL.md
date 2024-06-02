# Install

## Prerequisite
- Install Visual Studio Code: https://code.visualstudio.com/download
- Install NodeJS: https://nodejs.org/en/download
  - Checking NodeJS installed correctly: `node -v`
- Install Yarn: `npm install -g yarn`
  - Checking Yarn installed correctly: `yarn -v`

## Start the project on local server (Migrated to Yarn)
- Run backend server local
- Open the project: `cd <project folder>/src`
- Install dependencies: `yarn install`
- Configure vars in `.env` file
  - `REACT_APP_BACKEND_URL = 'http://localhost:8080/'` - Url to BE Server on local
  - `REACT_APP_ITEMS_PER_PAGE = 10`
- Run the project: `yarn start`
- Open the project in browser: http://localhost:3000

## Deploy the project on dev server with Docker
This is the way to deploy the project on dev server with Docker

- Checkout the project
- Open the project: `cd <project folder>/src`
- Configure vars in `.env.staging` file
  - `REACT_APP_BACKEND_URL = 'YOUR BACKEND HOST URL'` - Url to BE Server on dev server (Ex: http://localhost:8080/)
  - `REACT_APP_ITEMS_PER_PAGE = 10`
- Build docker image: `docker build -t mentorus-web-admin:0.0.1 .`
- Start docker container: `docker run -d --restart always --name mentorus-web-admin --network mentorus-network -p 7002:80 mentorus-web-admin:0.0.1`
- Stop docker container: `docker stop mentorus-web-admin && docker rm mentorus-web-admin`

## Errors (if any)
- Error: [BABEL] ... Cannot find module '@babel/plugin-proposal-private-property-in-object' ...
  - Solution: 
    - Delete `node_modules` folder
    - Delete `yarn-lock.json` file
    - Run `yarn install`
    - Retry `yarn start`
