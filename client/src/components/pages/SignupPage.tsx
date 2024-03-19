import React from 'react';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';

export default function SignupPage(): JSX.Element {
  return (
    <Form>
      <Row className="row-cols-lg-auto g-3 align-items-center">
        <Col>
          <Label className="visually-hidden" for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="something@idk.cool"
            type="email"
          />
        </Col>
        <Col>
          <Label className="visually-hidden" for="exampleName">
            Имя
          </Label>
          <Input
            id="exampleName"
            name="name"
            placeholder="Женя9000"
            type="text"
          />
        </Col>
        <Col>
          <Label className="visually-hidden" for="examplePassword">
            Пароль
          </Label>
          <Input
            id="examplePassword"
            name="password"
            type="password"
          />
        </Col>
        <Col>
          <Button>Регистрация</Button>
        </Col>
      </Row>
    </Form>
  );
}
