import React from 'react';
import { Col, Row } from 'reactstrap';
import CharCard from './CharCard';
import { useAppSelector } from '../../redux/hooks';

export default function FavoriteCharList(): JSX.Element {
  const characters = useAppSelector((store) => store.characters.favorites);
  return (
    <Row>
      {characters.map((char) => (
        <Col xs="4" key={char.id}>
          <CharCard char={char} />
        </Col>
      ))}
    </Row>
  );
}
