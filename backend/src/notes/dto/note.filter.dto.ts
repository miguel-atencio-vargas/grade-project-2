import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class NoteFilterDTO {
  @IsOptional()
  uuid?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isDeleted?: boolean = false;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isArchived?: boolean;
}

export class NoteFilter extends NoteFilterDTO {
  constructor(uuid: string) {
    super();
    this.uuid = uuid;
  }
}
