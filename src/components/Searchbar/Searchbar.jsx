import css from './Searchbar.module.css';

export const Searchbar = ({onSubmit, getInputValue, value}) => {

  return (
    <header className={css.Searchbar}>
      <form onSubmit={onSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={getInputValue}
          value={value}
        />
      </form>
    </header>
  );
};
