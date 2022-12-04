const ProfileSkeleton = () => {
    return ( 
    <div className="flex flex-col mt-3">
    <header className="m-4 flex justify-around ">

    <div className="bg-gray-200  animate-pulse rounded-full object-cover aspect-ratio: auto; w-32 h-32" > </div>    

     <div className="flex gap-2 flex-col flex-grow-1  animate-pulse items-center justify-self-center">
     <p className="h-3 w-20 bg-gray-100">  </p>
     <div class="button flex justify-center p-0.5 w-24 h-8 animate-pulse bg-gray-100 rounded">

     </div>

     
        </div>       

     </header>

     <div className="m-5 flex flex-col gap-2  ">
 
     </div>
     <p className="w-full  h-0.5 rounded-md   bg-gray-200" > </p>

        <br className="bg-black"/>
        <div className="flex  items-center justify-around text-center">
        
     
        <p className="h-3 w-6 rounded bg-gray-200  animate-pulse"> </p>
        <p className="h-3 w-6 rounded  bg-gray-200  animate-pulse"> </p>
        <p className="h-3 w-6 rounded bg-gray-200  animate-pulse"> </p>
        </div>

        <main className="grid grid-cols-3 mt-10 gap-3">
            <div className=" bg-gray-200  animate-pulse h-[320px] w-[320px]"> </div>
            <div className=" bg-gray-200  animate-pulse h-[320px] w-[320px]"> </div>
            <div className=" bg-gray-200  animate-pulse h-[320px] w-[320px]"> </div>
            <div className=" bg-gray-200  animate-pulse h-[320px] w-[320px]"> </div>
            <div className=" bg-gray-200  animate-pulse h-[320px] w-[320px]"> </div>
            <div className=" bg-gray-200  animate-pulse h-[320px] w-[320px]"> </div>

             </main>
    </div> );
}
 
export default ProfileSkeleton;