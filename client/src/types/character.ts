export type CharacterType = {
  id: number;
  name: string;
  alive: boolean;
  image: string;
  type: string;
  userId: number;
};

export type AddCharacterForm = {
  name: string;
  image: string;
  type: string;
  alive?: 'on';
};

export type CharacterStateType = {
  chars: CharacterType[];
  selectedChar: CharacterType | null;
  favorites: CharacterType[];
  displayedChars: CharacterType[];
};
