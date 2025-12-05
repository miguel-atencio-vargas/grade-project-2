import { Module } from '@nestjs/common';
import { FirestoreModule } from '../config/firestore/firestore.module';

import NoteController from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [FirestoreModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule { }

