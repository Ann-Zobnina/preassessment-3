import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import type { CharacterType } from '../../types/character';
import TrashIcon from './icons/TrashIcon';
import PencilIcon from './icons/PencilIcon';
import ToggleOff from './icons/ToggleOff';
import HeartIcon from './icons/HeartIcon';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setCharFavorite,
  setSelectedCharById,
} from '../../redux/slices/characters/slice';
import {
  deleteCharThunk,
  editCharThunk,
} from '../../redux/slices/characters/thunks';
import { openModalWithSuccess } from '../../redux/slices/modal/slice';

type CharCardProps = {
  char: CharacterType;
};

function CharCard({ char }: CharCardProps): JSX.Element {
  console.log('card', char.id);
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((store) => store.characters.favorites);
  const isFavorite = useMemo(() => favorites.includes(char), [char, favorites]);

  const handlerDelete = (): void => {
    void dispatch(deleteCharThunk(char.id));
  };

  const toggleChar = (): void => {
    void dispatch(editCharThunk({ ...char, alive: !char.alive }));
  };

  const setFavorite = (): void => {
    dispatch(setCharFavorite(char));
    dispatch(
      openModalWithSuccess(
        !isFavorite
          ? 'Персонаж добавлен в избранное!'
          : 'Персонаж удален из избранного!',
      ),
    );
  };

  return (
    <Card
      style={{
        margin: '1rem',
        width: '18rem',
      }}
    >
      <img alt="Sample" src={char.image} />
      <CardBody>
        <CardTitle tag="h5">
          <Link to={`/characters/${char.id}`}>{char.name}</Link>
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {char.type}
        </CardSubtitle>
        <CardText>{char.alive ? 'Alive' : 'Dead'}</CardText>
        {user.status === 'logged' && user.id === char.userId && (
          <>
            <Button color="danger" outline onClick={handlerDelete}>
              <TrashIcon />
            </Button>
            <Button
              color="secondary"
              onClick={() => dispatch(setSelectedCharById(char.id))}
              outline
            >
              <PencilIcon />
            </Button>
            <Button color="secondary" outline onClick={toggleChar}>
              <ToggleOff />
            </Button>
            <Button color="secondary" outline onClick={setFavorite}>
              <HeartIcon />
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default React.memo(CharCard);
