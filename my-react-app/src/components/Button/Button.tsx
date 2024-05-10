import { ButtonProps } from '../App.types';
import css from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div className={css.buttonWrap}>
      <button className={css.button} onClick={onClick} type="button">
        Load more
      </button>
    </div>
  );
};
