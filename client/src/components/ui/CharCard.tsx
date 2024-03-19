import React from 'react';
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
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedCharById } from '../../redux/slices/characters/slice';

type CharCardProps = {
  char: CharacterType;
};

export default function CharCard({ char }: CharCardProps): JSX.Element {
  const dispatch = useAppDispatch();
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
        <Button color="danger" outline>
          <TrashIcon />
        </Button>
        <Button
          color="secondary"
          onClick={() => dispatch(setSelectedCharById(char.id))}
          outline
        >
          <PencilIcon />
        </Button>
        <Button color="secondary" outline>
          <ToggleOff />
        </Button>
        <Button color="secondary" outline>
          <HeartIcon />
        </Button>
      </CardBody>
    </Card>
  );
}
