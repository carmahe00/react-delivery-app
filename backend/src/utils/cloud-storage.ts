
import { Storage } from '@google-cloud/storage'
import { format } from 'util'
import { URL } from 'url';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();


const storage = new Storage({
    projectId: "firechat-95a9a",
    keyFilename: 'src/service-account-key.json'
});

const bucket = storage.bucket("gs://firechat-95a9a.appspot.com");

/**
 * Subir el archivo a Firebase Storage
 * @param {File} file objeto que sera almacenado en Firebase Storage
 */
const cloudStorage = (file: Express.Multer.File, pathImage: string, deletePathImage?: any): Promise<string> => {
    return new Promise((resolve, reject) => {

        console.info('delete path', deletePathImage)
        if (deletePathImage) {

            if (deletePathImage != null || deletePathImage != undefined) {
                const parsedUrl = new URL(deletePathImage);
                const pathname = parsedUrl.pathname; // Get the path component of the URL
                const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
                const fileDelete = bucket.file(filename)

                fileDelete.delete().then((imageDelete) => {

                    console.info('image deleted')
                }).catch(err => {
                    console.info('Failed to remove photo, error:', err)
                });

            }
        }


        if (pathImage) {
            if (pathImage != null || pathImage != undefined) {

                let fileUpload = bucket.file(`${pathImage}`);
                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: 'image/png',
                        metadata: {
                            firebaseStorageDownloadTokens: uuid,
                        }
                    },
                    resumable: false

                });

                blobStream.on('error', (error) => {
                    console.log('Error al subir archivo a firebase', error);
                    reject('Something is wrong! Unable to upload at the moment.');
                });

                blobStream.on('finish', () => {
                    // The public URL can be used to directly access the file via HTTP.
                    const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
                    console.log('URL DE CLOUD STORAGE ', url);
                    resolve(url);
                });

                blobStream.end(file.buffer);
            }
        }
    });
}

export default cloudStorage