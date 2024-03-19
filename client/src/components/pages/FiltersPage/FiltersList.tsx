import React from 'react';
import { Col, Row } from 'reactstrap';
import { useAppSelector } from '../../../redux/hooks';
import CharCard from '../../ui/CharCard';

export default function FiltersList(): JSX.Element {
  const characters = useAppSelector((store) => store.characters.displayedChars);
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
