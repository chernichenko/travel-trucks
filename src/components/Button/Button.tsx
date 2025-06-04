import { type ReactNode } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './Button.module.scss';

interface IButton {
  children: ReactNode;
  variant?: 'primary' | 'white';
  href?: string;
  target?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'primary',
  href,
  target,
  onClick,
}: IButton) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    onClick?.();

    if (href && target === '_blank') {
      const fullUrl = `${window.location.origin}${href}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
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
