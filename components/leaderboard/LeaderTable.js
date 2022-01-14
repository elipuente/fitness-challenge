import LeaderRow from "./LeaderRow";
import LoadingRowsSkeleton from "./LoadingRowsSkeleton";

const LeaderTable = ({ data }) => {
  return (
    <div className="flex flex-row justify-center mt-12 lg:mt-0">
      <div className="inline-block sm:px-6 lg:pl-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-gray-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-gray-300 scrollbar-track:!rounded max-h-96 supports-scrollbars:pr-2">
          <table className="divide-gray-200 w-full border-collapse text-center whitespace-normal">
            <thead className="bg-gray-50 overflow-auto flex w-[95vw] lg:w-[45vw] ">
              <tr className="flex justify-center w-full my-4">
                <th className="w-1/5 sticky z-8 leading-6 p-0 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Place
                </th>
                <th className="w-1/4 sticky z-8 leading-6 p-0 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="w-1/4 sticky z-8 leading-6 p-0 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="w-1/4 sticky z-8 leading-6 p-0 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Workouts
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 flex flex-col items-center justify-between overflow-y-scroll w-full max-h-80">
              {data ? (
                data.map((person, index) => (
                  <LeaderRow person={person} index={index} key={index} />
                ))
              ) : (
                <LoadingRowsSkeleton rows={5} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderTable;
