import Link from "next/link";

const Unauthorized = () => (
  <div className="flex justify-center items-center text-center h-screen">
    <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
      404
    </h1>
    <p className="pl-6">
      Page not found.
      <Link href={"/"}>
        <a className="text-emerald-500">{" Home"}</a>
      </Link>
    </p>
  </div>
);

export default Unauthorized;
