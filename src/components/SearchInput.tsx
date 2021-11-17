import { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXMark } from '@fortawesome/free-solid-svg-icons';
import { TEAL } from 'constants/colors';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const Input = styled.input`
  outline: none;
  padding: 0.5em 1em;
  position: relative;
  border-radius: 6px;
  border: solid 1px #bbb;
  color: #444;
  transition: border-color 0.15s ease;

  &:active, &:focus {
    border-color: ${TEAL};
  }
`;

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onChange(val);
  };

  return (
    <div
      css={css`
      position: relative;
    `}
    >
      <Input
        type="text"
        spellcheck="false"
        onChange={handleChange}
        placeholder="Search"
        value={value}
      />
      {value.length && (
        <span
          css={css`
              position: absolute;
              right: 6px;
            `}
        >
          <FontAwesomeIcon icon={faXMark} />
        </span>
      )}
    </div>
  );
};
