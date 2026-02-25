import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';

import styles from './styles.module.css';

export default function GlobalSearch() {
  const allDocs = useAllDocsData();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [isFocused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const searchIndex = useMemo(() => {
    const entries = [];
    Object.values(allDocs).forEach((plugin) => {
      plugin.versions.forEach((version) => {
        version.docs.forEach((doc) => {
          entries.push({
            title: doc.title,
            description: doc.description,
            permalink: doc.permalink,
            sidebar: doc.sidebar,
          });
        });
      });
    });
    return entries;
  }, [allDocs]);

  const results = useMemo(() => {
    if (!query) {
      return [];
    }
    const normalized = query.toLowerCase();
    return searchIndex
      .filter((doc) => {
        return (
          doc.title.toLowerCase().includes(normalized) ||
          (doc.description && doc.description.toLowerCase().includes(normalized))
        );
      })
      .slice(0, 8);
  }, [query, searchIndex]);

  const handleResultClick = useCallback((permalink) => {
    if (!permalink) return;
    if (typeof window !== 'undefined') {
      window.location.assign(permalink);
    }
    setQuery('');
    setActiveIndex(0);
    setFocused(false);
  }, []);

  const handleSearchKey = useCallback(
    (event) => {
      if (!results.length) {
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        handleResultClick(results[activeIndex].permalink);
      }
    },
    [results, activeIndex, handleResultClick],
  );

  const closeResults = useCallback(() => {
    setTimeout(() => setFocused(false), 120);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchShell}>
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M17.3 15.7l-3.7-3.7a6 6 0 10-1.6 1.6l3.7 3.7 1.6-1.6zM4.5 8.5a4 4 0 118 0 4 4 0 01-8 0z"
            fill="#94a3b8"
          />
        </svg>
        <input
          ref={inputRef}
          className={styles.searchInput}
          type="search"
          placeholder="Search the docs"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onFocus={() => setFocused(true)}
          onBlur={closeResults}
          onKeyDown={handleSearchKey}
          aria-label="Search documentation"
        />
        <span className={styles.shortcutHint}>⌘K</span>
      </div>
      {isFocused && query && (
        <div className={styles.resultsPanel}>
          {results.length === 0 && <p className={styles.emptyState}>No matches found.</p>}
          {results.map((result, index) => (
            <button
              key={result.permalink}
              type="button"
              className={clsx(styles.resultItem, index === activeIndex && styles.activeResult)}
              onMouseDown={() => handleResultClick(result.permalink)}>
              <span className={styles.resultTitle}>{result.title}</span>
              {result.sidebar && <span className={styles.resultMeta}>{result.sidebar}</span>}
              {result.description && (
                <span className={styles.resultDescription}>{result.description}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
