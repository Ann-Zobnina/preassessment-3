import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeContentModal } from '../../redux/slices/modal/slice';

export default function ContentModal(): JSX.Element {
  const modal = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
  const closeModal = (): void => {
    dispatch(closeContentModal());
  };
  return (
    <Modal isOpen={modal.show} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>{modal.title}</ModalHeader>
      <ModalBody>{modal.content}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Ясно
        </Button>
      </ModalFooter>
    </Modal>
  );
}
