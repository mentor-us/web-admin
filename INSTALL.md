# Install

## Prerequisite
- Install Visual Studio Code: https://code.visualstudio.com/download
- Install NodeJS: https://nodejs.org/en/download
  - Checking NodeJS installed correctly: `node -v`
  - Checking NPM installed correctly: `npm -v`

## Start the project
- Run backend server
- Open the project in terminal: `cd <project folder>/src`
- Install dependencies: `npm install`
- Run the project: `npm start`
- Open the project in browser: http://localhost:3000

## Errors (if any)
- Error: [BABEL] ... Cannot find module '@babel/plugin-proposal-private-property-in-object' ...
  - Solution: 
    - Delete `node_modules` folder
    - Delete `package-lock.json` file
    - Run `npm install`
    - Retry `npm start`