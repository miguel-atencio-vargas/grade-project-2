export interface INote {
  uuid: string;
  content: string;
  isArchived?: boolean;
  isDeleted?: boolean;
}
