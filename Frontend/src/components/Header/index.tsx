import { SearchBar } from '../SearchBar';
import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>mmartan</h1>
      
        <SearchBar />
      </div>
    </header>
  )
}