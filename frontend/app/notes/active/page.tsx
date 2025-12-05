import { Suspense } from 'react'
import ListNotes from '../ListNotes'

export default function Notes() {
  return (
    <section>
      <h3 className="text-2xl text-center">Active notes: </h3>
      <Suspense fallback={<Loading />}>
        <ListNotes isArchived={false} />
      </Suspense>
    </section>
  )
}

function Loading() {
  return <p>Loading notes...</p>;
}
