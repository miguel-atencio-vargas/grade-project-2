import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FIRESTORE_PROVIDER } from '../config/firestore/firestore.module';
import { Firestore } from 'firebase-admin/firestore';
import { NoteDTO } from './dto/note.dto';
import { NoteFilterDTO } from './dto/note.filter.dto';
import { NoteInterface } from './interfaces/note.interface';

@Injectable()
export class NoteService {
  private readonly collection = 'notes';

  constructor(
    @Inject(FIRESTORE_PROVIDER)
    private firestore: Firestore,
  ) { }

  async add(note: NoteDTO): Promise<NoteInterface> {
    const docRef = this.firestore.collection(this.collection).doc();
    const newNote: NoteInterface = {
      uuid: docRef.id,
      content: note.content,
      isArchived: note.isArchived ?? false,
      isDeleted: note.isDeleted ?? false,
    };

    await docRef.set(newNote);
    return newNote;
  }

  async update(note: NoteDTO): Promise<NoteInterface> {
    if (!note.uuid) {
      throw new NotFoundException('Note UUID is required for update');
    }

    const docRef = this.firestore.collection(this.collection).doc(note.uuid);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Note not found');
    }

    const updateData: Partial<NoteInterface> = {};
    if (note.content !== undefined) updateData.content = note.content;
    if (note.isArchived !== undefined) updateData.isArchived = note.isArchived;
    if (note.isDeleted !== undefined) updateData.isDeleted = note.isDeleted;

    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    return updatedDoc.data() as NoteInterface;
  }

  async getOne(uuid: string): Promise<NoteInterface> {
    const docRef = this.firestore.collection(this.collection).doc(uuid);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Note not found');
    }

    return doc.data() as NoteInterface;
  }

  async getOneBy(filter: NoteFilterDTO): Promise<NoteInterface> {
    const notes = await this.getBy(filter);

    if (notes.length === 0) {
      throw new NotFoundException('Note not found');
    }

    return notes[0];
  }

  async getBy(filter: NoteFilterDTO): Promise<NoteInterface[]> {
    let query: FirebaseFirestore.Query = this.firestore.collection(this.collection);

    // Apply filters
    if (filter.isArchived !== undefined) {
      query = query.where('isArchived', '==', filter.isArchived);
    }
    if (filter.isDeleted !== undefined) {
      query = query.where('isDeleted', '==', filter.isDeleted);
    }
    if (filter.uuid !== undefined) {
      query = query.where('uuid', '==', filter.uuid);
    }

    const snapshot = await query.get();

    return snapshot.docs.map(doc => doc.data() as NoteInterface);
  }
}
