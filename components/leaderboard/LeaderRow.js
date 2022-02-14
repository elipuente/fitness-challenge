import Link from "next/link";

import { useUser } from "../../utils/user";

const LeaderRow = ({ person, index }) => {
  const { user, signedIn } = useUser();

  return signedIn && user.id === person.id ? (
    <tr className="flex w-full justify-center py-3 bg-gray-100" key={index}>
      <td className="p-4 w-1/5">
        <div className="font-medium text-gray-900">{index + 1}</div>
      </td>
      <td className=" p-4 w-1/4">
        <div className="font-medium text-gray-900">{"You!"}</div>
      </td>
      <td className="p-4 w-1/4">
        <div className="font-medium text-gray-900">{`${person.totalScore}`}</div>
      </td>
      <td className="p-4 w-1/4">
        <Link href={`/user/${person.id}/workouts`}>
          <a className="font-medium text-emerald-600">View Workouts</a>
        </Link>
      </td>
    </tr>
  ) : (
    <tr className="flex w-full justify-center py-3" key={index}>
      <td className="p-4 w-1/5">
        <div className="font-medium text-gray-900">{index + 1}</div>
      </td>
      <td className=" p-4 w-1/4">
        <div className="font-medium text-gray-900">{`${person.firstName} ${person.lastName}`}</div>
      </td>
      <td className="p-4 w-1/4">
        <div className="font-medium text-gray-900">{`${person.totalScore}`}</div>
      </td>
      <td className="p-4 w-1/4">
        <Link href={`/user/${person.id}/workouts`}>
          <a className="font-medium text-emerald-600">View Workouts</a>
        </Link>
      </td>
    </tr>
  );
};
export default LeaderRow;
