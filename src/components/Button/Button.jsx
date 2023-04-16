import css from './Button.module.css';
import propTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <button type="submit" className={css.button} onClick = {onLoadMore}>
        Load more
    </button>
  )
}

Button.propTypes = {
  onLoadMore: propTypes.func.isRequired,
};