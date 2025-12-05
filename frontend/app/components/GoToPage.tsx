import Link from 'next/link';

interface IGoToPage {
  href: string;
  text: string;
}

export default function GoToPage({ href, text }: IGoToPage) {
  let path = href;

  // Remove ./ prefix if present
  if (path.startsWith('./')) {
    path = path.slice(2);
  } else if (path === '.') {
    path = '';
  }

  // If path is empty, it's home. Point to index.html for GCS compatibility.
  if (!path) {
    path = 'index.html';
  }

  return <Link className="text-1xl text-center flex justify-center" href={`/${path}`}>{text}</Link>;
}
