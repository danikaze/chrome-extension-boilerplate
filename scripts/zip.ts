import { normalize } from 'path';
import { zip } from 'zip-a-folder';

/*
 * Zips into a file with a name given by the first agument
 * the CONTENT of the folder given by the second argument
 *
 * Same as calling
 * `zip -r -q "${TARGET_ZIP}" "${FOLDER}/*`
 */
const currentFile = process.argv.findIndex((arg) => arg.endsWith(__filename));
const targetFile = normalize(process.argv[currentFile + 1]);
const folder = normalize(process.argv[currentFile + 2]);

(async function () {
  await zip(folder, targetFile);
})();
