import Link from "next/link";

const Button = ({ text, path }) => (
  <Link href={path}>
    <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
      {text}
    </a>
  </Link>
);

export default Button;
