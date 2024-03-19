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
