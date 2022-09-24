#!/usr/bin/env bash

set -e

COLOR_HIGHLIGHT='\033[1;33m'
COLOR_RESET='\033[0m'

SCRIPTS_DIR=`dirname "${BASH_SOURCE[0]}"`
PWD=`pwd`
DIR="$( cd "${SCRIPTS_DIR}" >/dev/null 2>&1 && pwd )"/..
APP="${DIR}/release/app"
TARGET_DIR="${DIR}/release/dist"
WEBPACK="${DIR}/node_modules/.bin/webpack"
PACKAGE_JSON="${DIR}/package.json"
MANIFEST_JSON="${DIR}/manifest.json"
PACKAGE_NAME=$(cat "${PACKAGE_JSON}" \
  | grep '"name"' \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
PACKAGE_VERSION=$(cat "${PACKAGE_JSON}" \
  | grep '"version"' \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
TARGET_ZIP="${TARGET_DIR}/${PACKAGE_NAME}-${PACKAGE_VERSION}.zip"
PEM_KEY="${DIR}/${PACKAGE_NAME}.pem"

mkdir -p "${TARGET_DIR}"

# Generate built files in the `app` folder
echo -e "Building ${COLOR_HIGHLIGHT}${PACKAGE_NAME}-${PACKAGE_VERSION}${COLOR_RESET}"
cd "${DIR}"
$WEBPACK --config webpack.config.ts --env=production

# Generate the zip file (for the Chrome store)
echo -e "* Creating ${COLOR_HIGHLIGHT}$(basename "${TARGET_DIR}")/$(basename "${TARGET_ZIP}")${COLOR_RESET}"
cd "${SCRIPTS_DIR}"
ts-node ./zip.ts "${TARGET_ZIP}" "${APP}"

# Restore the working directory
cd "$PWD"
