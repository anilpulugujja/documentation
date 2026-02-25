import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import styles from './styles.module.css';

export default function DocItemLayoutWrapper(props) {
  return (
    <div className={styles.layoutShell}>
      <DocItemLayout {...props} />
    </div>
  );
}
