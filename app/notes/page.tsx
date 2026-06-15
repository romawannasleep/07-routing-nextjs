import { HydrationBoundary } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query';
import NotesClient from './filter/[...slug]/Notes.client';
import { fetchNotes } from '../../lib/api';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(Array.isArray(params?.page) ? params.page[0] : params?.page) || 1;
  const perPage = 12;
  const search = (Array.isArray(params?.search) ? params.search[0] : params?.search) || '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['notes', page, search], queryFn: () => fetchNotes({ page, perPage, search }) });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialPage={page} initialSearch={search} />
    </HydrationBoundary>
  );
}