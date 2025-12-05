import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import config from './config/app.config';
import validations from './config/app.validation';
import firestoreValidations from './config/firestore/firestore.validation';

import { FirestoreModule } from './config/firestore/firestore.module';
import { NoteModule } from './notes/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ...validations,
        ...firestoreValidations,
      }),
      load: [config],
    }),
    FirestoreModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

