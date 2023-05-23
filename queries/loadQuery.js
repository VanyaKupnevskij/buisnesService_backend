import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

const loadQuery = (fileName) => {
  const filePath = path.resolve('queries', fileName + '.sql');

  if (!existsSync(filePath)) {
    throw new Error(`Not found file '${fileName}.sql'`);
  }

  return readFileSync(filePath, 'utf8');
};

export default loadQuery;
