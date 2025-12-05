import Link from 'next/link';

interface IGoToPage {
  href: string;
  text: string;
}

export default function GoToPage({ href, text }: IGoToPage) {
  let path = href;

  // Clean relative prefixes
  if (path.startsWith('./')) path = path.slice(2);
  if (path === '.') path = '';

  // Development: Use clean URLs
  if (process.env.NODE_ENV === 'development') {
    if (path.endsWith('/')) path = path.slice(0, -1);
  }
  // Production: Use explicit index.html for GCS XML endpoint compatibility
  else {
    if (!path || path === '/') {
      path = 'index.html';
    } else if (!path.includes('.')) {
      if (path.endsWith('/')) path = path.slice(0, -1);
      path = `${path}/index.html`;
    }
  }

  const finalHref = path.startsWith('/') ? path : `/${path}`;

  return <Link className="text-1xl text-center flex justify-center" href={finalHref}>{text}</Link>;
}
