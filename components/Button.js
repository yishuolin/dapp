import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const getVariantStyle = {
  outlined: `
    border: 2px double transparent;
    background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)), radial-gradient(circle at left top, rgb(1, 110, 218), rgb(217, 0, 192));
    background-origin: border-box;
    background-clip: padding-box, border-box;
    `,
  filled: `
    background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
    border: 0;
    `,
  semiTransparent: `
    background-color: rgba(82, 76, 209, 0.35);
    border: 1px solid rgba(82, 76, 209, 0.45);
    color: rgba(255, 255, 255, 0.8);
    `,
};

const StyledButton = styled.button`
  font-family: sans-serif;
  color: #fff;
  font-size: 18px;
  padding: ${(props) => props.padding || '12px 32px'};
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  ${(props) => props.variant && getVariantStyle[props.variant]}
  &:hover {
    ${(props) =>
      props.glowOnHover &&
      `
    box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 15px 0px;
    transition: all 0.3s ease;`}
    ${(props) =>
      props.variant === 'outlined' &&
      `
    background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
    transition: all 0.3s ease;
    `}
    ${(props) =>
      props.variant === 'semiTransparent' &&
      `
        background-color: rgba(82, 76, 209, 0.5);
        border: 1px solid rgba(82, 76, 209, 0.7);
        color: rgba(255, 255, 255, 0.9);
      `}
  }
  transition: all 0.3s ease;
  &:disabled {
    cursor: auto;
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['outlined', 'filled', 'semiTransparent']),
  glowOnHover: PropTypes.bool,
};

export default Button;
