import { registerAs } from '@nestjs/config';

export interface FirestoreConfig {
    projectId: string;
    credentialsPath?: string;
}

export default registerAs('firestore', (): FirestoreConfig => ({
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    credentialsPath: process.env.GOOGLE_APPLICATION_CREDENTIALS,
}));
