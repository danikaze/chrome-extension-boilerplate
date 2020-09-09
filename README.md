# chrome-extension-boilerplate

Boilerplate to create Chrome extensions using TypeScript + ReactJS

## Features

### Ready

- [TypeScript](https://www.typescriptlang.org/) support
- [React](https://reactjs.org/) support
- [Prettier](https://prettier.io/)
- [Linting](https://palantir.github.io/tslint/)
- [Build time constants](build-time-constants/README.md) (including [git revisions](https://www.npmjs.com/package/git-revision-webpack-plugin) and secrets)
- Build command creates a Web Store-ready zip

### Planned

- [Material UI](https://material-ui.com/)
- CRX Package building with a given .pem key
- Auto publishing to the Chrome Web Store using the [Web Store Publish API](https://developer.chrome.com/webstore/using_webstore_api)
- Generate all icon sizes from the manifest data and only one big icon image

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
git push -u origin master
```

3. Edit the `name`, `description` and `version` if needed in [package.json].

4. Edit the `name`, `short_name`, `description` and `browser_action.default_title` fields in [manifest.json]. It's also recommended to [reduce the needed permissions](https://developer.chrome.com/extensions/declare_permissions) as much as possible. The `version` field will be automatically sync'ed with the one in `package.json` in each build.

5. Install the needed packages

```
npm install
```

## Development

This application is set to render the [<App>](src/components/app.tsx) component as an entry point of your application.

[Some constants](build-time-constants/build.d.ts) defined at build time are available, however others can be added as well. Check [this document](build-time-constants/README.md) for more information.
