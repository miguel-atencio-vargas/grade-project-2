import { EditForm } from "./EditForm"
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Page(context) {
  const uuid = context.params.uuid;
  const response = await fetch(`${API_URL}/notes/${uuid}`, {
    cache: 'no-store'
  });
  if(response.status!==200) return (<h1>Sorry, we could not find the note. Please try again.</h1>)
  
  const note = await response.json();
  
  return (
    <main>
      <h2>Lets edit this note:</h2>
      <EditForm note={note} />
    </main>
  )
}