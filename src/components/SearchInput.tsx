import { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BLUE, DARK_GREY, MEDIUM_GREY } from 'constants/colors';
import { BORDER_RADIUS } from 'constants/layout';
import { BORDER } from 'constants/styles';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const Input = styled.input`
  outline: none;
  padding: 0.5em 2em 0.5em 2.5em;
  position: relative;
  border-radius: ${BORDER_RADIUS};
  border: ${BORDER};
  color: ${MEDIUM_GREY};
  height: 32px;
  width: 200px;
  transition: all 0.25s ease;

  &:active,
  &:focus {
    border-color: ${BLUE};
  }

  &:not([value='']) {
    padding-left: 1em;
    color: ${DARK_GREY};
  }
`;

const CloseButton = styled.span`
  display: flex;
  align-items: center;
  color: ${MEDIUM_GREY};
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 6px 8px 6px 0;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${DARK_GREY};
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  width: 14px;
  height: 14px;
  color: ${MEDIUM_GREY};
  opacity: 1;
  position: absolute;
  left: 12px;
  top: 9px;
  z-index: 1;
  transition: opacity 0.2s ease;
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
      <SearchIcon
        icon={faSearch}
        fixedWidth={true}
        style={{ opacity: value.length ? 0 : 'inherit' }}
      />
      <Input
        type='text'
        spellCheck={false}
        onChange={handleChange}
        placeholder='Search'
        value={value}
      />
      {value.length ? (
        <CloseButton onClick={() => onChange('')}>
          <FontAwesomeIcon
            style={{ width: 14, height: 14, fill: 'currentColor' }}
            icon={faTimesCircle}
          />
        </CloseButton>
      ) : null}
    </div>
  );
};
