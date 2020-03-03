# Rbk Platform e-learning Backend 

<p align="center">
  <a href="https://example.com/">
    <img src="https://via.placeholder.com/72" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Logo</h3>

  <p align="center">
    Short description
  </p>
</p>


## Table of contents

- [Quick start](#quick-start)
- [Status](#status)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)


## Quick start

### Installation Guidelines
### Prerequisites

If you don’t havee any of these tools installed already, you will need to:
```
 Download and install git
 Download and install nodejs https://nodejs.org
```


### Get Started
You will need to clone source code of client GitHub repository. To do this open console and execute following lines:

```shell
git clone https://github.com/OmarBelguith/RBK-Platform-e-learning.git
```
### Installing Node Modules
You will need to clone source code of client GitHub repository. To do this open console and execute following lines:

```
 cd RBK-Platform-e-learning
 npm install
```

### Running local copy
To run local copy in development mode, execute:
```
 npm start
```
your http://localhost:3000 will be running for API calls


### Setting your environment

The file _.env.dev_ is meant to set the environment variables, _.dev_ is meant to reference the development environment,
If you need to set a new one, make a copy of the same file and rename it to environment you need to work on.
ex: _.env.prod_ .
In which, you'll set the environment variables you need to work on.
To tell express which environment to follow, go to _app.js_
and change the line 
```
require('custom-env').env('dev');
```
to
 
```
require('custom-env').env('prod');
```


## Status

Flow is in developmennt process


## What's included

Here is the folder structure

```text
├───config
|
├───Controllers
|
├───models
|
├───operations
|
├───public
|
├───routes
│   └───api
├───Services
│  
├───uploads
|
├───views
```

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issues](https://github.com/OmarBelguith/RBK-Platform-e-learning/issues) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Ogui99/Flow-backend/issues/new).

## Contributing

In order to contribute with a feature or User Story in the project you need to create a new branch with your name and the feature name e.g:
```text
branch name : your-name-feature-name
```

Please read through our [Endpoint guidelines](https://github.com/OmarBelguith/RBK-Platform-e-learning/blob/master/ENDPOINT.md). Included are directions for making an endpoint and notes on development.

Please Read our coding style and contribution [guidelines](https://github.com/OmarBelguith/RBK-Platform-e-learning/blob/master/GUIDELINES.md).

Moreover, all Javascript should conform to the [Code Guide](https://github.com/OmarBelguith/RBK-Platform-e-learning/blob/master/RULES.md), maintained by [standard](https://github.com/standard/standard).


## Thanks

Thanks to the team

## Copyright and license

Enjoy :metal:



