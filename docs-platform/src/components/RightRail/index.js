import React from 'react';
import TOC from '@theme/TOC';
import styles from './styles.module.css';

export default function RightRail({ toc = [], frontMatter = {} }) {
  if (!toc?.length) {
    return null;
  }

  const card = frontMatter.right_rail_card || null;

  return (
    <aside className={styles.rail}>
      <div className={styles.card}>
        <p className={styles.cardLabel}>On this page</p>
        <TOC
          toc={toc}
          minHeadingLevel={frontMatter.toc_min_heading_level}
          maxHeadingLevel={frontMatter.toc_max_heading_level}
        />
      </div>
      {card && (
        <div className={styles.infoCard}>
          <p className={styles.infoTitle}>{card.title}</p>
          <p className={styles.infoBody}>{card.body}</p>
          {card.link && (
            <a className={styles.infoLink} href={card.link.url}>
              {card.link.label}
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
