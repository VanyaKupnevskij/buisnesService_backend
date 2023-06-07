import styles from './style.module.scss';

import { Link } from 'react-router-dom';
import { COLORS } from '../../styles/variablesJs';
import styled from 'styled-components';

function Button({
  style,
  className = '',
  isLink = false,
  linkPath = '/',
  children,
  onClick,
  disabled,
}) {
  const _className = `${styles.root} ${className}`;

  return isLink ? (
    <Link to={linkPath} className={_className} onClick={onClick} style={style} disabled={disabled}>
      {children}
    </Link>
  ) : (
    <button className={_className} onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
}

const SecondaryButton = styled(Button)`
  background-color: ${COLORS.secondary_color};
  color: ${COLORS.white_color};
  &:hover {
    background-color: ${COLORS.secondary_dark_color};
  }
`;

export { SecondaryButton };

export default Button;
