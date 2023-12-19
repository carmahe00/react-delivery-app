import admin from 'firebase-admin';
import { resolve } from 'path'

const absolutePathServiceAccount = resolve(__dirname,"./service-account-key.json")
admin.initializeApp({
    credential: admin.credential.cert(absolutePathServiceAccount),
})

export default admin