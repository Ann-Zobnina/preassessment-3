import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CharacterStateType,
  CharacterType,
} from '../../../types/character';
import { getAllCharsThunk } from './thunks';

const initialState: CharacterStateType = {
  chars: [],
  selectedChar: null,
  favorites: [],
  displayedChars: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCharsThunk.fulfilled, (state, action) => {
      state.chars = action.payload;
      state.displayedChars = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  clearSelectedChar,
  addCharacter,
  setCharacters,
  setSelectedCharById,
} = charactersSlice.actions;

export default charactersSlice.reducer;
