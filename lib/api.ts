import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NewNoteData } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page?: number;
  perPage?: number;
  totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  // Only include `tag` in request params if it's provided and not equal to 'all'
  const { tag, ...rest } = params;
  const requestParams: Record<string, unknown> = { ...rest };

  if (tag && tag !== 'all') {
    // backend expects `tag` query param when filtering by tag
    requestParams.tag = tag;
  }

  const response: AxiosResponse<FetchNotesResponse> = await api.get('/notes', { params: requestParams });
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
};

export const fetchNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = fetchNote;

export const getNotes = async (categoryId?: string) => {
  const res = await axios.get<Note>('/notes', {
    params: { categoryId },
  });
  return res.data;
};
