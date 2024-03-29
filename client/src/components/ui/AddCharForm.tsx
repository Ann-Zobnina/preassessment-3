import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import type { CharacterType } from '../../types/character';
import CharCard from './CharCard';
import { useAppDispatch } from '../../redux/hooks';
import { addCharThunk } from '../../redux/slices/characters/thunks';
import { openModalWithError, openModalWithSuccess } from '../../redux/slices/modal/slice';

const defaultCardData: Omit<CharacterType, 'id' | 'userId'> = {
  name: 'Крутой бобёр',
  type: 'Бобёр',
  image:
    'https://cdn.oboi7.com/7195df099a0962e78a7172aa828d9702709f4c12/krutye-bobry.png',
  alive: true,
};

export default function AddCharForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [cardData, setCardData] =
    useState<Omit<CharacterType, 'id' | 'userId'>>(defaultCardData);

  const hangleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setCardData({ ...cardData, [event.target.name]: event.target.value });

  const handlerSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault(); 
    if (
      cardData.image.startsWith('http://') ||
      cardData.image.startsWith('https://')
    ) {
      void dispatch(addCharThunk(cardData));
      dispatch(openModalWithSuccess('Новый персонаж успешно добавлен!'));
    } else {
       dispatch(
         openModalWithError(
           'Некорректный адрес картинки!',
         ),
       );
    }
  };

  return (
    <Row>
      <Col xs="6">
        <Form onSubmit={handlerSubmit}>
          <FormGroup>
            <Label for="charName">Имя</Label>
            <Input
              value={cardData.name}
              onChange={hangleChange}
              id="charName"
              name="name"
              placeholder="Имя"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="charType">Тип</Label>
            <Input
              value={cardData.type}
              onChange={hangleChange}
              id="charType"
              name="type"
              placeholder="Тип"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="charImg">Картинка</Label>
            <Input
              value={cardData.image}
              onChange={hangleChange}
              id="charImg"
              name="image"
              placeholder="http://..."
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <Input
              checked={cardData.alive}
              onChange={() =>
                setCardData((prev) => ({ ...prev, alive: !prev.alive }))
              }
              type="checkbox"
              name="alive"
            />
            <Label>Жив</Label>
          </FormGroup>
          <Button type="submit">
            Добавить
          </Button>
        </Form>
      </Col>
      <Col xs="6">
        <CharCard char={{ ...cardData, id: 0, userId: 0 }} />
      </Col>
    </Row>
  );
}
