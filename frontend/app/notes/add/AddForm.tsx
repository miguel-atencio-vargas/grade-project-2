'use client'
import { useFormState, useFormStatus } from "react-dom";
import { addNote } from './actions'
import { SubmitButton } from "@/components/SubmitButton"

const initialState = {
  message: '',
};

export function AddForm() {
  const [state, formAction] = useFormState(addNote, initialState);

  return (
    <form action={formAction} className="flex flex-col">
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="note" name="note" placeholder="Type some here.." required/>
      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </form>
  );
}