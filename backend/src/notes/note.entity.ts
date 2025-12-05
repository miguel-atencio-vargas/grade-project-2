import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NoteInterface } from './interfaces/note.interface';

@Entity('notes')
export class NoteEntity implements NoteInterface {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column('text')
  public content: string;

  @Column('boolean', { default: false })
  public isArchived: boolean;

  @Column('boolean', { default: false })
  public isDeleted: boolean;
}
