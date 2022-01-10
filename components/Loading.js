import LoadingSpinner from "./LoadingSpinner";

const Loading = ({ text }) => (
  <div className="flex justify-center items-center h-screen">
    <LoadingSpinner /> &nbsp; {text ?? "Loading..."}
  </div>
);

export default Loading;
