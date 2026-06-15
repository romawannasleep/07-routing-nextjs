"use client";

import React, {  useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';

import Pagination from '../../../../components/Pagination/Pagination';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import NoteList from '../../../../components/NoteList/NoteList';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import css from './page.module.css';

type Props = {
  category: string | undefined;
};

export default function NotesClient ({category}: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, category],
    queryFn: () => fetchNotes({ page, perPage, search, tag: category}),
    staleTime: 300,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (!data) return null;
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note
        </button>
        {data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
      {data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data.notes.length === 0 && <p>No notes found</p>}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};