import React from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import NoteDetails from './NoteDetails.client';
import { fetchNote } from '../../../lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['note', id], queryFn: () => fetchNote(id) });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
    <NoteDetails/>
    </HydrationBoundary>
  );
}
