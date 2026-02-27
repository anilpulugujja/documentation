import React from 'react';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

import styles from './styles.module.css';

export default function BreadcrumbBar() {
  const { metadata } = useDoc();

  return (
    <div className={styles.bar}>
      <div className={styles.metaRow}>
        <DocBreadcrumbs />
      </div>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{metadata.title}</h1>
        {metadata.description && <p className={styles.subtitle}>{metadata.description}</p>}
      </div>
    </div>
  );
}
