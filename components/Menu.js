import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import Button from "./Button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Menu = ({ links, signedIn }) => {
  const router = useRouter();

  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Popover.Group as="nav" className="hidden md:flex space-x-10">
        <Link href="/">
          <a
            className={classNames(
              router.asPath === "/"
                ? "text-emerald-500 hover:text-emerald-600"
                : "text-gray-500 hover:text-gray-900",
              "text-base font-medium"
            )}
          >
            Home
          </a>
        </Link>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? "text-gray-900" : "text-gray-500",
                  "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                )}
              >
                <span>Options</span>
                <ChevronDownIcon
                  className={classNames(
                    open ? "text-gray-600" : "text-gray-400",
                    "ml-2 h-5 w-5 group-hover:text-gray-500"
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md -translate-x-1/2 sm:px-0 lg:ml-0 lg:left-1/2">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {links.map((link) =>
                        link.disabled ? (
                          <a
                            className="-m-3 p-3 flex items-start rounded-lg cursor-not-allowed"
                            aria-disabled
                            key={link.name}
                          >
                            <link.icon
                              className="flex-shrink-0 h-6 w-6 text-gray-500"
                              aria-hidden="true"
                            />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-500">
                                {link.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Please sign in to continue.
                              </p>
                            </div>
                          </a>
                        ) : (
                          <Link href={link.href} key={link.name}>
                            <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <link.icon
                                className="flex-shrink-0 h-6 w-6 text-emerald-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {link.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {link.description}
                                </p>
                              </div>
                            </a>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </Popover.Group>
      {signedIn ? (
        <Button text={"Sign out"} path={"/user/logout"} />
      ) : (
        <Button text={"Sign in"} path={"/user/login"} />
      )}
    </div>
  );
};

export default Menu;
