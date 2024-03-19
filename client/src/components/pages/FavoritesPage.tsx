import React from 'react';
import { Col, Row } from 'reactstrap';
import FavoriteCharList from '../ui/FavoritesCharList';

export default function FavoritesPage(): JSX.Element {
  return (
    <Row>
      <Col xs="12">
        <FavoriteCharList />
      </Col>
    </Row>
  );
}
