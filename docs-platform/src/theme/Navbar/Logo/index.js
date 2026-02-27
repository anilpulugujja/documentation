import React from 'react';
import NavbarLogo from '@theme-original/Navbar/Logo';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useOrgContext } from '../../hooks/useOrgContext';

export default function NavbarLogoWrapper(props) {
  const { siteConfig } = useDocusaurusContext();
  const { activeOrg } = useOrgContext();
  const defaultLogo = siteConfig?.themeConfig?.navbar?.logo || {};
  const lightSource = activeOrg?.theme?.logoLight || defaultLogo.src;
  const darkSource = activeOrg?.theme?.logoDark || defaultLogo.srcDark || lightSource;
  const logo = {
    ...defaultLogo,
    src: useBaseUrl(lightSource),
    srcDark: useBaseUrl(darkSource),
  };

  return <NavbarLogo {...props} logo={logo} />;
}
