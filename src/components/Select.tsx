import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { DARK_GREY, MEDIUM_GREY, BLUE, RED } from 'constants/colors';
import { BORDER_RADIUS } from 'constants/layout';
import { BORDER, FONT_FAMILY } from 'constants/styles';

const SelectContainer = styled.div`
  position: relative;

  &:hover,
  &:active {
    & > select {
      border-color: ${BLUE};
      color: ${DARK_GREY};
    }

    & > svg {
      color: ${BLUE};
    }
  }
`;

const SelectElement = styled.select`
  outline: none;
  padding: 4px 36px 4px 8px;
  font-family: ${FONT_FAMILY};
  appearance: none;
  font-size: 13px;
  font-weight: 500;
  color: ${MEDIUM_GREY};
  border: ${BORDER};
  border-radius: ${BORDER_RADIUS};
  height: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: border-color 0.15s ease;
`;

const Chevron = styled(FontAwesomeIcon)`
  position: absolute;
  pointer-events: none;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: ${MEDIUM_GREY};
  padding-left: 6px;
  box-sizing: content-box;
  border-left: ${BORDER};
  transition: color 0.15s ease;
`;

type SelectProps = {
  width?: number;
} & JSX.IntrinsicElements['select'];

export const Select = ({ width = 200, ...props }: SelectProps) => {
  return (
    <SelectContainer>
      <SelectElement style={{ width }} {...props} />
      <Chevron icon={faChevronDown} />
    </SelectContainer>
  );
};
