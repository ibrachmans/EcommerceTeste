import styles from './styles.module.scss';
import React, { useState } from 'react';
import { MdSearch, MdClear } from "react-icons/md";
import { useRef } from 'react';

export function Header({updateSearch}) {
  const input = useRef<any>(null);

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
              onChange={(input) => 
                updateSearch(input.currentTarget.value)
              }

            />
            <button
              className={styles.searchClear}
              onClick={() => {
                updateSearch("");
                input.current.value = ""
              }}
            >
             <MdClear />
            </button>
          </div>
        </div>
      </header>
  )
}