import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/characters/slice';
import authReducer from './slices/auth/slice';
import modalReducer from './slices/modal/slice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    auth: authReducer,
    modal: modalReducer,
  },
});

export type StoreT = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
