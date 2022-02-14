import Image from "next/image";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import {
  ChartBarIcon,
  MenuIcon,
  PlusCircleIcon,
  ViewListIcon,
} from "@heroicons/react/outline";

import puenteFitnessChallenge from "../public/logos/puenteFitnessChallenge.webp";
import { useUser } from "../utils/user";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { user, signedIn } = useUser();

  const links = [
    {
      name: "View Leaderboard",
      description: "See the current standings.",
      href: "/leaderboard",
      icon: ChartBarIcon,
      disabled: false,
    },
    {
      name: "Add Workout",
      description: "Add a workout to increase your score.",
      href: signedIn ? `/user/${user.id}/workouts/add` : "",
      icon: PlusCircleIcon,
      disabled: !signedIn,
    },
    {
      name: "View Previous Workouts",
      description: "View your previously entered workouts.",
      href: signedIn ? `/user/${user.id}/workouts/` : "",
      icon: ViewListIcon,
      disabled: !signedIn,
    },
    // {
    //   name: "Create Workout Suggestion",
    //   description: "Coming soon.",
    //   href: "#",
    //   icon: ViewGridAddIcon,
    //   disabled: !signedIn,
    // },
  ];

  return (
    <Popover className="relative bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-end md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <div className="w-64">
                  <Image
                    className="w-64"
                    src={puenteFitnessChallenge}
                    alt="Puente Wedding Fitness Challenge logo"
                  />
                </div>
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Menu links={links} signedIn={signedIn} />
        </div>
      </div>

      <MobileMenu links={links} signedIn={signedIn} />
    </Popover>
  );
};

export default Header;
