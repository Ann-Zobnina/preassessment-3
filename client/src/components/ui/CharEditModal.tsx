import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearSelectedChar,
} from '../../redux/slices/characters/slice';

export default function CharEditModal(): JSX.Element {
  const selectedChar = useAppSelector((store) => store.characters.selectedChar);
  const dispatch = useAppDispatch();
  const closeModal = (): void => {
    dispatch(clearSelectedChar());
  };

  const [newName, setNewName] = useState('');
  useEffect(() => {
    if (selectedChar) setNewName(selectedChar.name);
  }, [selectedChar]);

  const editHandler = (): void => {
    closeModal();
  };

  return (
    <div>
      <Modal isOpen={!!selectedChar} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>{selectedChar?.name}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="charName">Изменить имя</Label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              id="charName"
              name="name"
              placeholder="Имя"
              type="text"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editHandler}>
            Сохранить
          </Button>{' '}
          <Button color="secondary" onClick={closeModal}>
            Отменить
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
