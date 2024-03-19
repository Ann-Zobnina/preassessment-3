import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CharacterType } from '../../../types/character';
import charService from '../../../services/api/charService';

export const getAllCharsThunk = createAsyncThunk<CharacterType[]>(
  'characters/getAllCharsThunk',
  () => charService.getAllChars(),
);

export const getOneCharThunk = createAsyncThunk<
  CharacterType,
  CharacterType['id']
>('characters/getOneCharThunk', (id) => charService.getCharById(id));

// Допиши недостающие Thunk actions
export const deleteCharThunk = createAsyncThunk<number, number>(
  'characters/deleteCharThunk',
  async (id) => {
    await charService.deleteCharById(id);
    return id;
  }
);

export const addCharThunk = createAsyncThunk<
  CharacterType,
  Omit<CharacterType, 'id' | 'userId'>
>('characters/addCharThunk', (formData) => charService.createNewChar(formData));

export const editCharThunk = createAsyncThunk<CharacterType, CharacterType>
  ('characters/editCharThunk', (formData) => charService.editChar(formData));
