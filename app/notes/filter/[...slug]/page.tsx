import { HydrationBoundary } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesByCategory ({ params }: Props) {
 const { slug } = await params

const category = slug?.[0] === "all" ? undefined : slug?.[0];
 const queryClient = new QueryClient();
 
await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag: category, page: 1 }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag: category,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
