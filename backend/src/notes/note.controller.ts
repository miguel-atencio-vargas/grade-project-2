import {
  Body,
  Controller,
  ClassSerializerInterceptor,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDTO } from './dto/note.dto';
import { NoteFilterDTO, NoteFilter } from './dto/note.filter.dto';
import { UUIDParamDTO } from 'src/common/dto/uuid.dto';

@Controller('notes')
export default class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createNote(@Body() note: NoteDTO): Promise<NoteDTO> {
    return this.noteService.add(note);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':uuid')
  async updateNote(@Param() params: UUIDParamDTO, @Body() note: NoteDTO) {
    if (params.uuid !== note.uuid) throw new BadRequestException();
    return this.noteService.update(note);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Query() filter: NoteFilterDTO): Promise<NoteDTO[]> {
    return this.noteService.getBy(filter);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  async getOne(@Param() params: UUIDParamDTO): Promise<NoteDTO> {
    const filter = new NoteFilter(params.uuid);
    return this.noteService.getOneBy(filter);
  }
}
