import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { useAppSelector } from '../../redux/hooks';
import PencilIcon from '../ui/icons/PencilIcon';
import ToggleOff from '../ui/icons/ToggleOff';

export default function OneCharacterPage(): JSX.Element {
  const { id } = useParams();
  const displayedChar = useAppSelector((store) =>
    store.characters.chars.find((char) => char.id === Number(id)),
  );
  if (!displayedChar) return <h1>Ошибка</h1>;

  return (
    <Row>
      <Col xs="6">
        <Row className="m-3">
          <Col xs="4">
            <h4>Имя</h4>
          </Col>
          <Col xs="4">
            <p>{displayedChar.name}</p>
          </Col>
          <Col xs="4">
            <Button color="secondary" outline>
              <PencilIcon />
            </Button>
          </Col>
        </Row>
        <Row className="m-3">
          <Col xs="4">
            <h4>Тип</h4>
          </Col>
          <Col xs="8">
            <p>{displayedChar.type}</p>
          </Col>
        </Row>
        <Row className="m-3">
          <Col xs="4">
            <h4>Статус</h4>
          </Col>
          <Col xs="4">
            <p>{displayedChar.alive ? 'Alive' : 'Dead'}</p>
          </Col>
          <Col xs="4">
            <Button color="secondary" outline>
              <ToggleOff />
            </Button>
          </Col>
        </Row>
      </Col>
      <Col xs="6">
        <img
          style={{ width: '18rem' }}
          alt="Sample"
          src={displayedChar.image}
        />
      </Col>
    </Row>
  );
}
