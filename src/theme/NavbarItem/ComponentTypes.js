import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import QuickNav from '@site/src/components/QuickNav';
import IconLink from '@site/src/components/IconLink';

// TBoard navbar item types: quick-jump mega menu and icon hyperlinks.
// The top-right search slot uses @theme/SearchBar (Docusaurus native mount).
export default {
  ...ComponentTypes,
  'custom-quicknav': QuickNav,
  'custom-iconlink': IconLink,
};
