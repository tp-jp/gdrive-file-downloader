# gdrive-file-downloader

This GitHub Action allows you to download files from Google Drive using the Google Drive API. It supports downloading any type of file, such as images, documents, videos, and more.

## Features

- Download any file from Google Drive by specifying its file ID
- Supports multiple file downloads in a single run
- Uses OAuth2 for authentication

## Usage

### Example Workflow

```yaml
name: Download Files from Google Drive

on:
  workflow_dispatch:

jobs:
  download-files:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Download files from Google Drive
        uses: <your-username>/gdrive-file-downloader@main
        with:
          google_client_id: ${{ secrets.GOOGLE_CLIENT_ID }}
          google_client_secret: ${{ secrets.GOOGLE_CLIENT_SECRET }}
          google_refresh_token: ${{ secrets.GOOGLE_REFRESH_TOKEN }}
          file_ids: '[{"id": "fileId1", "name": "path/to/save/file1.png"}, {"id": "fileId2", "name": "path/to/save/file2.pdf"}]'
```

## Inputs

| Name                 | Description                                                         | Required | Example                                               |
| -------------------- | ------------------------------------------------------------------- | -------- | ----------------------------------------------------- |
| google_client_id     | The Google OAuth Client ID                                          | true     | ${{ secrets.GOOGLE_CLIENT_ID }}                       |
| google_client_secret | The Google OAuth Client Secret                                      | true     | ${{ secrets.GOOGLE_CLIENT_SECRET }}                   |
| google_refresh_token | The OAuth Refresh Token for Google Drive API                        | true     | ${{ secrets.GOOGLE_REFRESH_TOKEN }}                   |
| file_ids             | A JSON array of file IDs and file paths for saving downloaded files | true     | [{"id": "fileId1", "name": "path/to/save/file1.png"}] |

## Outputs

None.

## Authentication

To use this action, you must set up a Google OAuth2 client in your Google Cloud Console and generate the necessary credentials (Client ID, Client Secret, and Refresh Token). These should be stored as GitHub secrets in your repository:

- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REFRESH_TOKEN
  For detailed instructions on how to obtain these credentials, refer to the Google Drive API documentation.

## File IDs

To download files, you must specify the file IDs from Google Drive. You can find the file ID in the URL of the file in Google Drive (e.g., https://drive.google.com/file/d/FILE_ID/view).

## License

This project is licensed under the MIT License. See the LICENSE file for details.
