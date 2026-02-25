import React, { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

const ACTION_DELAY = 2200;

const getDocText = () => {
  if (typeof document === 'undefined') {
    return '';
  }
  const node = document.querySelector('.theme-doc-markdown');
  return node ? node.innerText : '';
};

export default function BreadcrumbBar() {
  const { siteConfig } = useDocusaurusContext();
  const { metadata } = useDoc();
  const [copyStatus, setCopyStatus] = useState('Copy for LLM');

  const askUrl = siteConfig.customFields?.askPageUrl;
  const rawBase = siteConfig.customFields?.rawContentBaseUrl;

  const rawMarkdownUrl = useMemo(() => {
    if (!rawBase || !metadata?.source) {
      return null;
    }
    const relativePath = metadata.source.replace('@site/', '');
    return `${rawBase.replace(/\/+$/, '')}/${relativePath}`;
  }, [metadata?.source, rawBase]);

  const handleAsk = useCallback(() => {
    if (!askUrl) return;
    const target = `${askUrl}${askUrl.includes('?') ? '&' : '?'}page=${encodeURIComponent(
      metadata.permalink,
    )}`;
    window.open(target, '_blank', 'noopener');
  }, [askUrl, metadata.permalink]);

  const handleCopy = useCallback(async () => {
    const text = getDocText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy for LLM'), ACTION_DELAY);
    } catch (err) {
      console.error('Unable to copy page contents', err);
    }
  }, []);

  const handleMarkdownView = useCallback(() => {
    if (!rawMarkdownUrl) return;
    window.open(rawMarkdownUrl, '_blank', 'noopener');
  }, [rawMarkdownUrl]);

  return (
    <div className={styles.bar}>
      <div className={styles.metaRow}>
        <DocBreadcrumbs />
      </div>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{metadata.title}</h1>
        {metadata.description && <p className={styles.subtitle}>{metadata.description}</p>}
      </div>
      <div className={styles.actions}>
        {askUrl && (
          <button type="button" className={clsx(styles.actionBtn, styles.neutral)} onClick={handleAsk}>
            Ask about this page
          </button>
        )}
        <button type="button" className={styles.actionBtn} onClick={handleCopy}>
          {copyStatus}
        </button>
        {rawMarkdownUrl && (
          <button type="button" className={styles.actionBtn} onClick={handleMarkdownView}>
            View as Markdown
          </button>
        )}
      </div>
    </div>
  );
}
