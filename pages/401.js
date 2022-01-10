import Link from "next/link";

const Unauthorized = () => (
  <div className="flex justify-center items-center text-center h-screen">
    <p>
      You aren&apos;t allowed to view this page. Please
      <Link href={"/user/login"}>
        <a className="text-emerald-500">{" sign in "}</a>
      </Link>
      or{" "}
      <Link href={"/"}>
        <a className="text-emerald-500">{" go home"}</a>
      </Link>
      .
    </p>
  </div>
);

export default Unauthorized;
