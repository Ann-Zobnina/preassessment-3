import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CharacterStateType,
  CharacterType,
} from '../../../types/character';
import {
  addCharThunk,
  deleteCharThunk,
  editCharThunk,
  getAllCharsThunk,
} from './thunks';
import { SelectOptionType } from '../../../components/pages/FiltersPage/filterGuard';

const initialState: CharacterStateType = {
  chars: [],
  selectedChar: null,
  favorites: [],
  displayedChars: [],
  loading: true,
  filter: '',
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CharacterType>) => {
      state.chars.unshift(action.payload);
    },
    setCharacters: (state, action: PayloadAction<CharacterType[]>) => {
      state.chars = action.payload;
    },
    setSelectedCharById: (
      state,
      action: PayloadAction<CharacterType['id']>,
    ) => {
      const targetChar = state.chars.find((char) => char.id === action.payload);
      if (targetChar) state.selectedChar = targetChar;
    },
    clearSelectedChar: (state) => {
      state.selectedChar = null;
    },
    setCharFavorite: (state, action: PayloadAction<CharacterType>) => {
      const targetIndex = state.favorites.findIndex(
        (char) => char.id === action.payload.id,
      );
      if (targetIndex === -1) state.favorites.push(action.payload);
      else state.favorites.splice(targetIndex, 1);
    },
    setFilter: (state, action: PayloadAction<SelectOptionType>) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCharsThunk.fulfilled, (state, action) => {
      state.chars = action.payload;
      state.displayedChars = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteCharThunk.fulfilled, (state, action) => {
      const targetIndex = state.chars.findIndex(
        (char) => char.id === action.payload,
      );
      if (targetIndex !== -1) {
        state.chars.splice(targetIndex, 1);
      }
    });
    builder.addCase(addCharThunk.fulfilled, (state, action) => {
      state.chars.unshift(action.payload);
    });
    builder.addCase(editCharThunk.fulfilled, (state, action) => {
      const targetChar = state.chars.find(
        (char) => char.id === action.payload.id,
      );
      if (targetChar) {
        Object.assign(targetChar, action.payload);
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  clearSelectedChar,
  addCharacter,
  setCharacters,
  setSelectedCharById,
  setCharFavorite,
  setFilter,
} = charactersSlice.actions;

export default charactersSlice.reducer;
