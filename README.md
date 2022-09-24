# chrome-extension-boilerplate

Boilerplate to create Chrome extensions using TypeScript + ReactJS

## Features

### Ready

- [TypeScript](https://www.typescriptlang.org/) support
- Source path aliases support
- [React](https://reactjs.org/) support
- CSS modules with scss/sass support
- [Prettier](https://prettier.io/)
- [Linting](https://eslint.org/)
- [Build time constants](build-time-constants/README.md) (including [git revisions](https://www.npmjs.com/package/git-revision-webpack-plugin) and secrets)
- Build command creates a Web Store-ready zip

### Planned (?)

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

4. Edit the `name`, `short_name`, `description` and `browser_action.default_title` fields in [manifest.json](./manifest.json). It's also recommended to [reduce the needed permissions](https://developer.chrome.com/extensions/declare_permissions) as much as possible. The `version` field will be automatically sync'ed with the one in `package.json` in each build.

5. Install the needed packages

```
npm install
```

6. TypeScript path aliases

In case that custom path aliases are required:

- For path aliases to be available in the main process, edit the [main/tsconfig.json](./main/tsconfig.json) file.
- For path aliases to be available in the renderer process, edit the [renderer/tsconfig.json](./renderer/tsconfig.json) file.
- Add the union of all the added aliases to the `no-implicit-dependencies` rule in the [tslint.yaml](./tslint.yaml) file.

## Development

This application is set to render the [<App>](src/components/app/index.tsx) component as an entry point of your application.

[Some constants](build-time-constants/build.d.ts) defined at build time are available, however others can be added as well. Check [this document](build-time-constants/README.md) for more information.

To develop, just execute

```
npm run dev
```

Source code will be generated in the [release/app](./release/app) folder and it can be imported as an unpacked extension in chrome.

## Build to release

Execute

```
npm run build
```

The resulting zip file will be placed in the [release/dist] folder and it can be uploaded to the [Chrome Store dashboard](https://chrome.google.com/webstore/devconsole/).
