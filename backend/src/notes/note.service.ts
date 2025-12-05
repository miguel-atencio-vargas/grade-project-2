import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteEntity } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteDTO } from './dto/note.dto';
import { NoteFilterDTO } from './dto/note.filter.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
  ) {}

  async add(note: NoteDTO) {
    const newNote = this.noteRepository.create(note);
    await this.noteRepository.save(newNote);
    return newNote;
  }

  async update(note: NoteDTO) {
    return this.noteRepository.save(note);
  }

  async getOne(uuid: string): Promise<NoteEntity> {
    try {
      return await this.noteRepository.findOneByOrFail({ uuid });
    } catch (e) {
      throw new NotFoundException('Note not found');
    }
  }

  async getOneBy(filter: NoteFilterDTO): Promise<NoteEntity> {
    try {
      return await this.noteRepository.findOneByOrFail(filter);
    } catch (e) {
      throw new NotFoundException('Note not found');
    }
  }

  async getBy(filter: NoteFilterDTO): Promise<NoteEntity[]> {
    const queryBuilder = this.noteRepository.createQueryBuilder('notes');
    queryBuilder.where(filter);
    const { entities } = await queryBuilder.getRawAndEntities();
    return entities;
  }
}
