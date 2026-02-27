import React, { useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useHistory } from '@docusaurus/router';
import { useOrgContext } from '../hooks/useOrgContext';
import styles from './styles.module.css';

const OrgSwitcher = ({ activeOrg, organizations, productById }) => {
  const history = useHistory();
  if (!organizations || organizations.length <= 1) {
    return null;
  }
  const handleChange = (event) => {
    const nextOrg = organizations.find((org) => org.id === event.target.value);
    if (!nextOrg) return;
    const defaultProductId = nextOrg.defaultProduct || nextOrg.products?.[0];
    const product = defaultProductId ? productById.get(defaultProductId) : null;
    if (!product) return;
    const docSlug = product.entryDoc || 'overview';
    const targetPath =
      product.versioning.type === 'versioned'
        ? `/${nextOrg.slug}/${product.slug}/${product.versioning.current}/${docSlug}`
        : `/${nextOrg.slug}/${product.slug}/latest/${docSlug}`;
    history.push(targetPath);
  };

  return (
    <div className={styles.orgSwitcher}>
      <label htmlFor="navbar-org" className={styles.orgLabel}>
        Org
        <select
          id="navbar-org"
          value={activeOrg?.id || organizations[0].id}
          onChange={handleChange}
          className={styles.orgSelect}
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.displayName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default function NavbarWrapper(props) {
  const { activeOrg, organizations, productById } = useOrgContext();
  const logoLight = useBaseUrl(activeOrg?.theme?.logoLight || 'img/logo-light.svg');
  const logoDark = useBaseUrl(activeOrg?.theme?.logoDark || 'img/logo-dark.svg');

  useEffect(() => {
    if (!activeOrg) {
      return;
    }
    const root = document.documentElement;
    if (activeOrg.theme?.primary) {
      root.style.setProperty('--tenant-primary', activeOrg.theme.primary);
    }
    if (activeOrg.theme?.secondary) {
      root.style.setProperty('--tenant-secondary', activeOrg.theme.secondary);
    }
    root.style.setProperty('--tenant-logo-light', `url(${logoLight})`);
    root.style.setProperty('--tenant-logo-dark', `url(${logoDark})`);
    root.dataset.tenant = activeOrg.slug;
    return () => {
      root.style.removeProperty('--tenant-logo-light');
      root.style.removeProperty('--tenant-logo-dark');
    };
  }, [activeOrg, logoDark, logoLight]);

  return (
    <div className={styles.navbarWrapper}>
      <Navbar {...props} />
      <OrgSwitcher activeOrg={activeOrg} organizations={organizations} productById={productById} />
    </div>
  );
}
