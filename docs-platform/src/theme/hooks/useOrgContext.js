import { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

export function useOrgContext() {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();
  const { customFields = {} } = siteConfig || {};
  const organizations = customFields.organizations || [];
  const products = customFields.products || [];
  const defaultOrgId = customFields.defaultOrgId;
  const productBySlug = useMemo(() => {
    return new Map(products.map((product) => [product.slug, product]));
  }, [products]);
  const productById = useMemo(() => {
    return new Map(products.map((product) => [product.id, product]));
  }, [products]);

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const activeOrg =
      organizations.find((org) => org.slug === segments[0]) ||
      organizations.find((org) => org.id === defaultOrgId) ||
      organizations[0] || null;
    const activeProduct =
      productBySlug.get(segments[1]) || null;

    return {
      activeOrg,
      activeProduct,
      organizations,
      products,
      productById,
    };
  }, [defaultOrgId, organizations, pathname, productById, productBySlug, products]);
}
