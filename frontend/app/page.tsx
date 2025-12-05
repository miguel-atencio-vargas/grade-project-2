import GoToPage from "@/components/GoToPage"

export default async function Page() {
  return (
    <main className="flex space-x-5">
      <GoToPage href={'./notes/active'} text={'Active notes'} />
      <GoToPage href={'./notes/archive'} text={'Archived notes'} />
      <GoToPage href={'./notes/add'} text={'Add a note'} />
    </main>
  )
}