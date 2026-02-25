import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import ContentVisibility from '@theme/ContentVisibility';
import RightRail from '@site/src/components/RightRail';
import BreadcrumbBar from '@site/src/components/BreadcrumbBar';

import styles from './styles.module.css';

export default function DocItemLayout({ children }) {
  const { metadata, frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const canRenderTOC = !frontMatter.hide_table_of_contents && toc.length > 0;
  const showDesktopRail = canRenderTOC && (windowSize === 'desktop' || windowSize === 'ssr');

  return (
    <div className={styles.page}>
      <ContentVisibility metadata={metadata} />
      <DocVersionBanner />
      <div className={styles.versionBadge}>
        <DocVersionBadge />
      </div>
      <BreadcrumbBar />
      {!showDesktopRail && canRenderTOC && <DocItemTOCMobile />}
      <div className={clsx(styles.pageGrid, showDesktopRail && styles.withRail)}>
        <article className={styles.article}>
          <DocItemContent>{children}</DocItemContent>
          <DocItemFooter />
          <DocItemPaginator />
        </article>
        {showDesktopRail && <RightRail toc={toc} frontMatter={frontMatter} />}
      </div>
    </div>
  );
}
