import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { registerThunk } from '../../redux/slices/auth/thunks';
import { openModalWithError } from '../../redux/slices/modal/slice';

export default function SignupPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.password.length < 3) {
      dispatch(openModalWithError('Пароль не может быть короче 3 символов!'));
    } else {
      void dispatch(registerThunk(input))
        .then(() => navigate('/characters'))
        .catch(() =>
          dispatch(
            openModalWithError(
              'Ошибка регистрации!',
            ),
          ),
        );
    }
  };

  return (
    <Form onSubmit={handlerSubmit}>
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
            value={input.email}
            onChange={handlerChange}
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
            value={input.name}
            onChange={handlerChange}
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
            value={input.password}
            onChange={handlerChange}
          />
        </Col>
        <Col>
          <Button>Регистрация</Button>
        </Col>
      </Row>
    </Form>
  );
}
