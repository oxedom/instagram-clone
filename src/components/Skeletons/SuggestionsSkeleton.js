const SuggestionsSkeleton = () => {
  return (
    <div>
      <div className="mt-2 shadow-md border-solid text-center p-4 slide  rounded-lg grid-cols-4 grid  gap-5 w-[350px] bg-white">
        {[1, 2, 3, 4].map((i) => (
          <div className="m-1 rounded-full object-cover aspect-ratio:auto; w-16 h-16 bg-slate-100 animate-pulse">
            {" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsSkeleton;
