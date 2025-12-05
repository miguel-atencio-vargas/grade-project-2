import { IsNotEmpty } from 'class-validator';

export class NoteDTO {
  uuid?: string;

  @IsNotEmpty()
  content?: string;

  isDeleted?: boolean;

  isArchived?: boolean;
}
