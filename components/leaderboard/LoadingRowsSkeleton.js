const LoadingRowsSkeleton = ({ rows }) =>
  [...Array(rows)].map((_, index) => (
    <tr className="flex w-full justify-center py-3 bg-gray-100" key={index}>
      <td className="p-4 w-1/5">
        <div className="font-medium animate-pulse h-4 rounded-md bg-gray-300"></div>
      </td>
      <td className="p-4 w-1/4">
        <div className="font-medium animate-pulse h-4 rounded-md bg-gray-300"></div>
      </td>
      <td className="p-4 w-1/4">
        <div className="font-medium animate-pulse h-4 rounded-md bg-gray-300"></div>
      </td>
      <td className="p-4 w-1/4">
        <div className="font-medium animate-pulse h-4 rounded-md bg-gray-300"></div>
      </td>
    </tr>
  ));

export default LoadingRowsSkeleton;
