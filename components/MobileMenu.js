import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { HomeIcon, XIcon } from "@heroicons/react/outline";

const MobileMenu = ({ links, signedIn }) => {
  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-end">
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <Link href="/">
                  <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <HomeIcon
                      className="flex-shrink-0 h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Home
                    </span>
                  </a>
                </Link>
                {links.map((link) =>
                  link.disabled ? (
                    <a
                      className="-m-3 p-3 flex items-center rounded-md cursor-not-allowed"
                      aria-disabled
                      key={link.name}
                    >
                      <link.icon
                        className="flex-shrink-0 h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-500">
                        {link.name}
                      </span>
                    </a>
                  ) : (
                    <Link href={link.href} key={link.name}>
                      <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                        <link.icon
                          className="flex-shrink-0 h-6 w-6 text-emerald-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {link.name}
                        </span>
                      </a>
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div>
              {signedIn ? (
                <Link href="/user/logout">
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                    Sign out
                  </a>
                </Link>
              ) : (
                <Link href="/user/login">
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                    Sign in
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};

export default MobileMenu;
