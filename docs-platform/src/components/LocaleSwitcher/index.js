import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

const REGION_KEY = 'grd_docs_region';
const LANGUAGE_KEY = 'grd_docs_language';

const useClientValue = (key, fallback) => {
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(key);
    if (stored) {
      setValue(stored);
    }
  }, [key]);

  const update = (next) => {
    setValue(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, next);
    }
  };

  return [value, update];
};

export default function LocaleSwitcher() {
  const { siteConfig } = useDocusaurusContext();
  const localeOptions = siteConfig.customFields?.localeOptions || {};
  const regions = localeOptions.regions || [];
  const languages = localeOptions.languages || [];
  const [region, setRegion] = useClientValue(REGION_KEY, localeOptions.defaultRegion || regions[0]?.code || 'us');
  const [language, setLanguage] = useClientValue(
    LANGUAGE_KEY,
    localeOptions.defaultLanguage || languages[0]?.code || 'en',
  );

  if (!regions.length && !languages.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {regions.length > 0 && (
        <div className={styles.control}>
          <p className={styles.label}>Region</p>
          <select className={styles.select} value={region} onChange={(e) => setRegion(e.target.value)}>
            {regions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      {languages.length > 0 && (
        <div className={styles.control}>
          <p className={styles.label}>Language</p>
          <select className={styles.select} value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
