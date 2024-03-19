import React, { useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { useAppSelector } from '../../../redux/hooks';
import CharCard from '../../ui/CharCard';

export default function FiltersList(): JSX.Element {
  const characters = useAppSelector((store) => store.characters.chars);
  const filter = useAppSelector((store) => store.characters.filter);
  const user = useAppSelector((store) => store.auth.user);
  const favorites = useAppSelector((store) => store.characters.favorites);

  const filteredChars = useMemo(() => {
    switch (filter) {
      case 'alive':
        return characters.filter((char) => char.alive);

      case 'dead':
        return characters.filter((char) => !char.alive);

      case 'notype':
        return characters.filter((char) => !char.type);

      case 'personal':
        return characters.filter(
          (char) => user.status === 'logged' && char.userId === user.id,
        );

      case 'favorites':
        return characters.filter((char) =>
          favorites.find((favChar) => favChar.id === char.id),
        );

      default:
        return characters;
    }
  }, [characters, filter, favorites]);

  return (
    <Row>
      {filteredChars.map((char) => (
        <Col xs="4" key={char.id}>
          <CharCard char={char} />
        </Col>
      ))}
    </Row>
  );
}
