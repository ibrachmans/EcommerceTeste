import styles from './styles.module.scss';
import React from 'react';
import { MdSearch, MdClear } from "react-icons/md";
import { useRef, useState } from 'react';

export function Header({ updateSearch }) {
  const input = useRef<any>(null);
  const [enable, setEnable] = useState(false);


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>Ecommerce</h1>

        <div className={styles.searchBarContainer}>
          <span className={styles.searchIcon}><MdSearch /></span>
          <input
            ref={input}
            className={styles.searchBar}
            type="text"
            placeholder="Search..."
            onChange={(input) => {
              updateSearch(input.currentTarget.value)
              setEnable(input.currentTarget.value.length > 0)
            }
            }
          />
          <div className={styles.buttonContainer}>
            {enable &&
              <button
                className={styles.searchClear}
                onClick={() => {
                  updateSearch("");
                  input.current.value = "";
                  setEnable(false)
                }}
              >
                <MdClear />
              </button>
            }
          </div>
        </div>
      </div>
    </header>
  )
}