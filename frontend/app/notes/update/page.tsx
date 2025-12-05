'use client';

import { EditForm } from "./EditForm"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { INote } from '@/interfaces/Note.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function EditNoteContent() {
    const searchParams = useSearchParams();
    const uuid = searchParams.get('uuid');
    const [note, setNote] = useState<INote | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!uuid) {
            setLoading(false);
            return;
        }

        async function fetchNote() {
            try {
                const response = await fetch(`${API_URL}/notes/${uuid}`);
                if (response.ok) {
                    const data = await response.json();
                    setNote(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Failed to fetch note', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchNote();
    }, [uuid]);

    if (loading) return <p>Loading note...</p>;
    if (error || !note) return <h1>Sorry, we could not find the note. Please try again.</h1>;

    return (
        <>
            <h2>Lets edit this note:</h2>
            <EditForm note={note} />
        </>
    );
}

export default function Page() {
    return (
        <main>
            <Suspense fallback={<p>Loading...</p>}>
                <EditNoteContent />
            </Suspense>
        </main>
    )
}
