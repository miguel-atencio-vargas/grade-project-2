"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const note_service_1 = require("./note.service");
const note_dto_1 = require("./dto/note.dto");
const note_filter_dto_1 = require("./dto/note.filter.dto");
const uuid_dto_1 = require("../common/dto/uuid.dto");
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    async createNote(note) {
        return this.noteService.add(note);
    }
    async updateNote(params, note) {
        if (params.uuid !== note.uuid)
            throw new common_1.BadRequestException();
        return this.noteService.update(note);
    }
    async getAll(filter) {
        return this.noteService.getBy(filter);
    }
    async getOne(params) {
        const filter = new note_filter_dto_1.NoteFilter(params.uuid);
        return this.noteService.getOneBy(filter);
    }
};
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_dto_1.NoteDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "createNote", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Put)(':uuid'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uuid_dto_1.UUIDParamDTO, note_dto_1.NoteDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "updateNote", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_filter_dto_1.NoteFilterDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uuid_dto_1.UUIDParamDTO]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "getOne", null);
NoteController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteController);
exports.default = NoteController;
//# sourceMappingURL=note.controller.js.map