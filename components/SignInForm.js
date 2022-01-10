import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useUser } from "../utils/user";
import { setAccessToken } from "../utils/token";

const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit, errors, reset } = useForm();

  const { user, setUser } = useUser();
  const [error, setError] = useState("");

  if (user) {
    const { firstName } = user;
    return (
      <div className="md:max-w-md w-full flex flex-col justify-center bg-white rounded-md shadow-md">
        <div className="max-w-md mb-6 p-4">
          <div>
            <h2 className="mt-6 text-center text-2xl text-gray-900">
              {`Hi ${firstName} 👋`}
            </h2>
            <h2 className="text-center text-2xl text-gray-500">
              {`You're already signed in.`}
            </h2>
          </div>
          <div className="flex justify-end mt-12">
            <Link href="/user/logout" passHref>
              <button className="group relative flex justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <span className="absolute inset-y-0 flex items-center pl-3"></span>
                Sign out
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSignInRequest = async ({ first, last, number }) => {
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first,
        last,
        number,
      }),
    }).then((data) => data.json());

    if (res?.accessToken) {
      setUser(res.user);
      setAccessToken(res.accessToken);
      router.push("/leaderboard");
    } else {
      console.log("Invalid login, please try again.");
      setError(res.error);
    }
  };

  return (
    <div className="md:max-w-md w-full flex flex-col justify-center bg-white rounded-md shadow-md">
      <div className="max-w-md mb-6 p-4">
        <div>
          <h2 className="mt-6 text-center text-2xl text-gray-900">
            Sign in to compete
          </h2>
        </div>
        <form
          className="mt-8 space-y-4"
          onSubmit={handleSubmit(handleSignInRequest)}
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div className="flex flex-row justify-between">
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="first"
                type="first"
                autoComplete="given-name"
                required
                className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm mb-2 rounded-md w-[49%]"
                placeholder="First name"
                {...register("first", { required: true })}
              />
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="last"
                type="last"
                autoComplete="family-name"
                required
                className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm mb-2 rounded-md w-[49%]"
                placeholder="Last name"
                {...register("last", {
                  required: true,
                })}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                minLength={10}
                maxLength={10}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm rounded-md"
                placeholder="Phone Number"
                onInput={(input) =>
                  (input.target.value = input.target.value.replace(
                    /[^0-9]/g,
                    ""
                  ))
                }
                {...register("number", {
                  required: true,
                })}
              />
            </div>
          </div>
          <p className="text-red-400">{error}</p>
          <div className="flex justify-end">
            <button
              type="submit"
              className="group relative flex justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <span className="absolute inset-y-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
