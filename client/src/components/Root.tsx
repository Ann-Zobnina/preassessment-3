import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import CharEditModal from './ui/CharEditModal';
import ContentModal from './ui/ContentModal';

export default function Root(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col xs="12">
          <NavBar />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Outlet />
        </Col>
      </Row>
      <ContentModal />
      <CharEditModal />
    </Container>
  );
}
