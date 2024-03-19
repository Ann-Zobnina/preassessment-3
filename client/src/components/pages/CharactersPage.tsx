import React from 'react';
import { Col, Row } from 'reactstrap';
import AddCharForm from '../ui/AddCharForm';
import CharList from '../ui/CharList';
import { useAppSelector } from '../../redux/hooks';
import Loader from '../HOC/Loader';

export default function CharactersPage(): JSX.Element {
  const loading = useAppSelector((store) => store.characters.loading);
  return (
    <Loader loading={loading}>
      <div>
        <Row>
          <Col xs="12">
            <AddCharForm />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <CharList />
          </Col>
        </Row>
      </div>
    </Loader>
  );
}
