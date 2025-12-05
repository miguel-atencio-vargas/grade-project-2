import Link from 'next/link';

interface IGoToPage {
  href: string;
  text: string;
}

export default function GoToPage({ href, text }: IGoToPage) {
  let path = href;

  // If path is empty, it's home. Point to index.html for GCS compatibility.
  if (!path) {
    path = 'index.html';
  }
  // If it's not a file (no extension) and doesn't have a trailing slash, add one.
  else if (!path.endsWith('/') && !path.includes('.')) {
    path = `${path}/`;
  }

  return <Link className="text-1xl text-center flex justify-center" href={`/${path}`}>{text}</Link>;
}
