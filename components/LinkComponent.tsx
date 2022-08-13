import { FCC } from 'globalTypes';
import Link, { LinkProps } from 'next/link';

type LinkComponent = Pick<LinkProps, 'href'> & { className: string };

const LinkComponent: FCC<LinkComponent> = ({ children, className, href }) => (
  <Link prefetch href={href}>
    <a className={className}>{children}</a>
  </Link>
);

export default LinkComponent;
