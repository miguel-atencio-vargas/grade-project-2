import GoToPage from "@/app/components/GoToPage"
import { AddForm } from "./AddForm"
export default function Page() {

  return (
    <main>
      <GoToPage href={'./notes/active'} text={'Active notes'} />
      <h2 className="text-1xl text-center">Lets create a new note:</h2>
      <AddForm></AddForm>
    </main>
  )
}