const core = require('@actions/core');
const { google } = require('googleapis');
const fs = require('fs');

const clientId = core.getInput('google_client_id');
const clientSecret = core.getInput('google_client_secret');
const refreshToken = core.getInput('google_refresh_token');
const fileIds = JSON.parse(core.getInput('file_ids'));

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function downloadFile(fileId, fileName) {
  const dest = fs.createWriteStream(fileName);
  const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
  return new Promise((resolve, reject) => {
    response.data
      .on('end', () => {
        console.log(`Downloaded ${fileName}`);
        resolve();
      })
      .on('error', err => {
        console.error(`Error downloading file ${fileName}:`, err);
        reject(err);
      })
      .pipe(dest);
  });
}

(async () => {
  for (const { id, name } of fileIds) {
    await downloadFile(id, name);
  }
})();
