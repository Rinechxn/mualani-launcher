const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

function unzipFile(zipFilePath, extractToPath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: extractToPath }))
            .on('close', () => {
                console.log('Extraction complete');
                resolve();
            })
            .on('error', (err) => {
                console.error('Extraction failed:', err);
                reject(err);
            });
    });
}

// Usage example
const zipFile = 'path/to/your/file.zip';
const extractPath = 'path/to/extract/folder';

unzipFile(zipFile, extractPath)
    .then(() => {
        console.log('File unzipped successfully');
    })
    .catch((error) => {
        console.error('Error unzipping file:', error);
    });
