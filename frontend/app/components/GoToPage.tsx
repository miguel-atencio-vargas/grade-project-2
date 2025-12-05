import Link from 'next/link';

interface IGoToPage {
  href: string;
  text: string;
}

export default function GoToPage({ href, text }: IGoToPage) {
  return <Link className="text-1xl text-center flex justify-center" href={`/${href}`}>{text}</Link>;
}
