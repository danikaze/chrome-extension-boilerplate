# chrome-extension-boilerplate

Boilerplate to create Chrome extensions using TypeScript + ReactJS

## Features

### Ready

### Planned

- [TypeScript](https://www.typescriptlang.org/) support
- [Material UI](https://material-ui.com/)
- [Prettier](https://prettier.io/)
- [Linting](https://palantir.github.io/tslint/)
- CRX Package building with a given .pem key
- Build time constants (including [git revisions](https://www.npmjs.com/package/git-revision-webpack-plugin))
- Build time secret constants
- Auto publishing to the Chrome Web Store using the [Web Store Publish API](https://developer.chrome.com/webstore/using_webstore_api)

## Setup

Supposing we want to create a new project based on this boilerplate, into `PROJECT_FOLDER`:

1. Clone this repository

```
git clone https://github.com/danikaze/chrome-extension-boilerplate.git PROJECT_FOLDER
```

2. Change the origin to the new repository

```
cd PROJECT_FOLDER
git remote rm origin
git remote add origin YOUR_REMOTE_REPOSITORY.git
git branch --set-upstream-to=origin/master master
```

3. Change the `name`, `description` and `version` if needed in [package.json].

4. Install the needed packages

```
npm install
```