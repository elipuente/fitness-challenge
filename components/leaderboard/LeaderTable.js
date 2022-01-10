import LeaderRow from "./LeaderRow";

const LeaderTable = ({ data }) => {
  return (
    <div className="flex flex-row justify-center -mx-10 mt-12 sm:mx-0 sm:mt-0">
      <div className="-my-2 overflow-x-auto sm:-mx-10 lg:-mx-8">
        <div className="p inline-block sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-gray-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-gray-300 scrollbar-track:!rounded max-h-96 supports-scrollbars:pr-2">
            <table className="divide-gray-200 w-full border-collapse text-center whitespace-normal">
              <thead className="bg-gray-50 overflow-auto flex w-[100vw] sm:w-[45vw] ">
                <tr className="flex w-full my-4">
                  <th className="w-1/4 sticky z-8 leading-6 p-0 py-3 text-sm sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Standing
                  </th>
                  <th className="w-1/4 sticky z-8 leading-6 p-0 py-3 text-sm sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Competitor&apos;s Name
                  </th>
                  <th className="w-1/4 sticky z-8 leading-6 p-0 py-3 text-sm sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Score
                  </th>
                  <th className="w-1/4 sticky z-8 leading-6 p-0 py-3 text-sm sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View All Workouts
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 flex flex-col items-center justify-between overflow-y-scroll w-full max-h-80">
                {data.map((person, index) => (
                  <LeaderRow person={person} index={index} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderTable;
