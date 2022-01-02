# The Weather example ReactJS application

![Github workflow](https://github.com/thanhnhan2tn/nab-react-weather/actions/workflows/test/badge.svg)

## Description

The idea of this repo is to build a simple application complete with:

* a React front end
* a Node.js proxy server
* unit tests
* continuous integration (via CircleCI)
* continuous deployment (TBU)

## Technologies

* React ([You must install create-react-app](https://create-react-app.dev/docs/getting-started/))
* Redux Toolkit
* Redux Saga
* Boostrap
* Node.js ([Install NodeJS](https://nodejs.org/en/download/))
* Express
* Use of a third-party REST API ([Metaweather](https://metaweather.com/))
* CircleCI CI/CD


## Things already done

- [x] Scaffold app via create-react-app
- [x] [Design Highlevel Architecture](#Highlevel-Architecture)
- [x] [Add proxy server](#add-proxy-scripts)
- [x] [Add start-dev and start-local scripts](#add-start-dev-and-start-local-scripts)
- [x] Add weather info view
- [x] Add a favicon
- [x] Add error handling
- [x] [Add CircleCI CI/CD](#add-circleci-cicd)


## Should make improve

* [i18n](https://react.i18next.com/) for multiple languages.
* Add Autocomplete for search location and select exactly location.
* Lazy load and Memoization.

## Notes

### Highlevel Architecture

![weather info view](https://github.com/thanhnhan2tn/nab-react-weather/blob/master/public/images/diagram.png?raw=true)

The high-level architecture will consist of 3 layers:
* Frontend Application Layer: Provide user interface to end-user, include all application logic.
* Proxy Layer: The connecting layer, transferring data from 3rd party API to frontend and backward.
* Remote Infrastructure Layer: Provide data from 3rd parties through HTTP/HTTPS communication.

### Add proxy server

Since the `metaweather.com` API does not allow CORS to fetch API from client side, I added a basic server implementation using [Express](https://expressjs.com/).

So we add the following line to `package.json` to tell `webpack-dev-server` to proxy web service calls to our node server:

```
  "proxy": "http://localhost:3001/"
```

For more details, see [Proxying API Requests in Development](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development).

### Add proxy scripts

So now we need to run two web servers whilst doing local development. To make this easier, I update the `start` script:

```
react-scripts start & node proxy
```

This command launches both our node server and `webpack-dev-server`.

### Add weather view UI

![weather info view](https://github.com/thanhnhan2tn/nab-react-weather/blob/master/public/images/screenshot.png?raw=true)


### Add CircleCI CI/CD



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---
## Available Scripts

In the project directory, you can run:

- `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

- `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
