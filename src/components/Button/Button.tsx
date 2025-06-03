import { type ReactNode } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './Button.module.scss';

interface IButton {
  children: ReactNode;
  variant?: 'primary' | 'white';
  href?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
}: IButton) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    onClick?.();
    if (href) navigate(href);
  }
  return (
    <button
      className={classNames(styles.button, styles[variant])}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
