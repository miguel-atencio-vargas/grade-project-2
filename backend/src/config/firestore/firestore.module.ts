import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import firestoreConfig from './firestore.config';

export const FIRESTORE_PROVIDER = 'FIRESTORE';

@Global()
@Module({
    imports: [ConfigModule.forFeature(firestoreConfig)],
    providers: [
        {
            provide: FIRESTORE_PROVIDER,
            useFactory: (configService: ConfigService) => {
                const projectId = configService.get<string>('firestore.projectId');
                const credentialsPath = configService.get<string>('firestore.credentialsPath');
                const databaseId = configService.get<string>('firestore.databaseId');

                // Only initialize if not already initialized
                if (!admin.apps.length) {
                    const config: admin.AppOptions = {
                        projectId,
                    };

                    // If credentials path is provided, use it
                    if (credentialsPath) {
                        config.credential = admin.credential.cert(credentialsPath);
                    } else {
                        // Use application default credentials (useful for Google Cloud environments)
                        config.credential = admin.credential.applicationDefault();
                    }

                    admin.initializeApp(config);
                }

                // If databaseId is provided, connect to that specific database
                if (databaseId) {
                    return getFirestore(admin.app(), databaseId);
                }

                return getFirestore();
            },
            inject: [ConfigService],
        },
    ],
    exports: [FIRESTORE_PROVIDER],
})
export class FirestoreModule { }
