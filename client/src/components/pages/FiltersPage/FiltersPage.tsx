import React from 'react';
import { Col, Row } from 'reactstrap';
import FiltersSelect from './FiltersSelect';
import FiltersList from './FiltersList';

export default function FiltersPage(): JSX.Element {
  return (
    <>
      <Row>
        <Col xs="12">
          <FiltersSelect />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <FiltersList />
        </Col>
      </Row>
    </>
  );
}
