import styles from './styles.module.scss';

export function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <input 
        className={styles.searchBar} 
        type="text" 
        placeholder="Search..."
      />
  </div>
  );
}