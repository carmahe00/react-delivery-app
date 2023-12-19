import { Storage } from '@google-cloud/storage';
import { URL } from 'url';

const storage = new Storage({
    projectId: "firechat-95a9a",
    keyFilename: 'src/service-account-key.json'
});

const bucket = storage.bucket("firechat-95a9a.appspot.com");

const cloudDelete = (deletePathImages: string[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        console.info('delete path', deletePathImages);

        if (deletePathImages.length === 0) {
            // No images to delete, resolve immediately
            resolve("No images to delete");
            return;
        }

        deletePathImages.forEach((deletePathImage) => {
            console.info("Deleting path: " + deletePathImage);

            try {
                const parsedUrl = new URL(deletePathImage);
                const pathname = parsedUrl.pathname;
                const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
                const fileDelete = bucket.file(filename);

                fileDelete.delete()
                    .then(() => {
                        console.info('Image deleted');
                    })
            } catch (err) {
                console.error('Invalid URL:', deletePathImage);
            }
        });

        resolve("Image delete requests sent");
    });
};

export default cloudDelete;
