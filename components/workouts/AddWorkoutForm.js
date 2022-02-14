import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import LoadingSpinnerWhite from "../LoadingSpinnerWhite";
import { useUser } from "../../utils/user";
import { WORKOUTS } from "../../enums/workoutTypes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddWorkoutForm = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const handleSignInRequest = async ({ minutes, description }) => {
    setError("");
    if (!selectedWorkout) {
      setError("Please select a workout.");

      return;
    }

    setLoading(true);

    const res = await fetch("/api/post/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workout: { ...selectedWorkout, minutes, description },
        user,
      }),
    }).then((data) => data.json());

    if (res?.error) {
      setError(res.message);
      setLoading(false);
    }

    if (res?.success) {
      setUser({
        ...user,
        totalScore: res.updatedUser.totalScore,
      });

      router.push(
        `/user/${user.phoneNumber}/workouts?addedWorkout=${res.addedWorkout.id}`
      );
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md mt-6">
      <div className="mb-6 p-4">
        <form
          className="mt-8 space-y-4"
          onSubmit={handleSubmit(handleSignInRequest)}
          method="POST"
        >
          <div className="rounded-md shadow-sm">
            <div className="flex flex-row justify-between">
              <label htmlFor="first-name" className="sr-only">
                Workout Type
              </label>
              <Listbox value={selectedWorkout} onChange={setSelectedWorkout}>
                {({ open }) => (
                  <>
                    <div className="relative w-[65%]">
                      <Listbox.Button
                        className={classNames(
                          !selectedWorkout?.name && "text-gray-500",
                          "relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        )}
                      >
                        <span className="flex items-center">
                          <span className="ml-3 block truncate" placeholder="">
                            {selectedWorkout?.name ?? "Select Workout"}
                          </span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-in duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className="absolute z-10 mt-1 w-[75vw] sm:w-full bg-white shadow-lg sm:max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                          aria-required="true"
                        >
                          {WORKOUTS.map((workout) => (
                            <Listbox.Option
                              key={workout.name}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "text-white bg-emerald-600"
                                    : "text-gray-900",
                                  "cursor-default select-none relative py-2 pl-3 pr-9"
                                )
                              }
                              value={workout}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {workout.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-emerald-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              <label htmlFor="minutes" className="sr-only">
                Minutes
              </label>
              <input
                id="minutes"
                name="minutes"
                type="number"
                required
                hidden
                min={1}
                max={240}
                minLength={1}
                maxLength={3}
                className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm mb-2 rounded-md w-[32%]"
                placeholder="Minutes"
                onInput={(input) =>
                  (input.target.value = input.target.value.replace(
                    /[^0-9]/g,
                    ""
                  ))
                }
                {...register("minutes", {
                  required: true,
                  max: 240,
                  min: 1,
                  maxLength: 3,
                })}
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Workout Description
              </label>
              <textarea
                id="description"
                name="description"
                type="text"
                maxLength={280}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm rounded-md"
                placeholder="Description"
                {...register("description", { maxLength: 280 })}
              />
            </div>
          </div>
          <p className="text-red-400">{error}</p>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <span className="absolute inset-y-0 flex items-center pl-3"></span>
              {loading ? (
                <>
                  <LoadingSpinnerWhite /> {"Adding Workout..."}
                </>
              ) : (
                "Add workout"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkoutForm;
