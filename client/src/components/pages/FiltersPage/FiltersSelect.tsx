import React from 'react';
import { Col, Input, Row } from 'reactstrap';
// import type { SelectOptionType } from './filterGuard';
import valueIsSelectType from './filterGuard';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setFilter } from '../../../redux/slices/characters/slice';

export default function FiltersSelect(): JSX.Element {
  // const [selectValue, setSelectValue] = useState<SelectOptionType>('');
  const selectValue = useAppSelector((store) => store.characters.filter);
  const dispatch = useAppDispatch();

  return (
    <Row>
      <Col>
        <Input
          onChange={(e) => {
            const { value } = e.target;
            if (valueIsSelectType(value)) {
              dispatch(setFilter(value));
            }
            else {
              dispatch(setFilter(''));
            }
          }}
          value={selectValue}
          type="select"
          placeholder="Выбери фильтр"
          className="mb-3"
          style={{ width: '50%' }}
        >
          <option value="" disabled>
            Выбери фильтр
          </option>
          <option value="alive">Только живые</option>
          <option value="dead">Только неживые</option>
          <option value="favorites">Только избранные</option>
          <option value="notype">Без типа</option>
          <option value="personal">Только собственные</option>
        </Input>
      </Col>
    </Row>
  );
}
