import Link from "next/link";

const Errors = ({ path }) => (
  <div className="flex justify-center items-center text-center h-screen">
    <p>
      An error occurred. Please
      <Link href={path}>
        <a className="text-emerald-500">{" refresh "}</a>
      </Link>
      the page to continue...
    </p>
  </div>
);

export default Errors;
