import styled from '@emotion/styled';

type Props = {
  children: string;
  className?: string;
  style?: CSSStyleDeclaration;
};

const Paragraph = styled.p`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;

  &:first-of-type {
    margin-block-start: 0;
  }

  &:last-of-type {
    margin-block-end: 0;
  }
`;

export const P = ({ children, className, style }: Props) => {
  return (
    <>
      {children.split('\n').map((str, i) => (
        <Paragraph className={className} key={`p-${i}`} style={style}>
          {str}
        </Paragraph>
      ))}
    </>
  );
};
