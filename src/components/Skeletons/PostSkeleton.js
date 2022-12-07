import UserIconSkeleton from "./UserIconSkeleton";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col shadow-md border-solid m-3  max-w-[450px] rounded-lg ">
      <header className="bg-white p-4 rounded-lg flex items-center gap-2 ">
        <UserIconSkeleton></UserIconSkeleton>
        <p className="w-[150px] h-2 rounded-2xl animate-pulse  bg-gray-200">
          {" "}
        </p>
      </header>

      <div className="h-[400px] w-[350px] sm:w-[450px] sm:h-[650px] animate-pulse  bg-gray-200 "></div>

      <footer className="bg-white rounded-lg rounded-t-none max-w-[450px] h-[60px] flex flex-col gap-5 items-center">
        {/* <p className="bg-gray-100 w-[300px] rounded-2xl mt-3 h-2"> </p> */}
      </footer>
    </div>
  );
};

export default PostSkeleton;
