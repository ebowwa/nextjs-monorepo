import fs from 'fs';
import request from 'request';

export async function download(uri: string, filename: string, callback: () => void) {
  try {
    request.head(uri, (err, res, body) => {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', callback);
    });
  } catch (err) {
    console.error(err);
  }
}