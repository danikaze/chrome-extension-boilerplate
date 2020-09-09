# Build-time constants

This folder contains the definitions for the data defined in build-time. This data will be available as global constants.

#### xxx.d.ts

Declaration file describing the data type of each constant.

#### xxx.js

Definition file with the value of each constant, to be added at compilation time.

#### xxx-secret.js

Same as `xxx.js` but a file ending in `-secret` (i.e. `xxx-secret.js`) won't be included in the repository, being useful for declaring secret keys, passwords, etc.

The definitions of the `-secret` file must be in the same declaration file as the non-secret one (i.e. type declarations for `main-secret.js` **and** `main.js` will be specified in `main.d.ts`)
