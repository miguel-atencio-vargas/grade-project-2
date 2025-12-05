import { IsOptional } from 'class-validator';

export class NoteFilterDTO {
  @IsOptional()
  uuid?: string;

  @IsOptional()
  isDeleted?: boolean = false;

  @IsOptional()
  isArchived?: boolean;
}

export class NoteFilter extends NoteFilterDTO {
  constructor(uuid: string) {
    super();
    this.uuid = uuid;
  }
}
