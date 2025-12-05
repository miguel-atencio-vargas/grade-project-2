'use client'

import { useFormState } from "react-dom";
import { updateNote } from './actions'
import { SubmitButton } from "@/app/components/SubmitButton";
import { INote } from "@/app/interfaces/Note.interface";

const initialState = {
  message: '',
  uuid: '',
  content: '',
};

export function EditForm({ note }: { note: INote }) {
  initialState.uuid = note.uuid;
  initialState.content = note.content;

  const [state, formAction] = useFormState(updateNote, initialState);

  return (
    <form action={formAction}>
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="note" name="note" placeholder={note.content} />
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isArchived"
          name="isArchived"
          defaultChecked={note.isArchived}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="isArchived" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is archived?</label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isDeleted"
          name="isDeleted"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="isDeleted" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is deleted?</label>
      </div>
      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </form>
  );
}