#!/usr/bin/env bash

set -e

COLOR_HIGHLIGHT='\033[1;33m'
COLOR_RESET='\033[0m'

PWD=`pwd`
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"/..
APP="${DIR}/app"
TARGET_DIR="${DIR}/dist"
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
$WEBPACK --config webpack.config.js --env=production

# Check for the existance of `zip` command (in Mac is ok, in Windows doesn't exists by default)
if ! command -v zip &> /dev/null
then
    echo
    echo -e "${COLOR_HIGHLIGHT}zip${COLOR_RESET} command could not be found"
    echo -e "Just create a zip with the contents of the ${COLOR_HIGHLIGHT}app${COLOR_RESET} folder"
    # Restore the working directory
    cd "$PWD"
    exit
fi

# Generate the zip file (for the Chrome store)
echo -e "* Creating ${COLOR_HIGHLIGHT}$(basename "${TARGET_DIR}")/$(basename "${TARGET_ZIP}")${COLOR_RESET}"
cd "${APP}"
zip -r -9 -q "${TARGET_ZIP}" *

# Restore the working directory
cd "$PWD"
