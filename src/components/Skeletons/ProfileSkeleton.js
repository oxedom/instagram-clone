const ProfileSkeleton = () => {

    const SkeletonSquare = () => {
        return (         <div className=" bg-gray-200 animate-pulse 
        h-[130px] w-[130px]
        sm:w-[200px] sm:h-[200px] 
        md:w-[250px] md:h-[250px]
        lg:w-[320px] lg:h-[320px]"> </div>
);
    }
     

    return ( 
    <div className="flex flex-col mt-8 flex-grow-1">
    <header className="m-4 flex justify-around  ">
    

    <div className="bg-gray-200  animate-pulse rounded-full object-cover aspect-ratio: auto; w-20 h-20 md:w-32 md:h-32" > </div>    

     <div className="flex gap-2 flex-col flex-grow-1  animate-pulse items-center justify-self-center">

        
     <p className="h-4 w-24 bg-gray-100">  </p>
     <div class="button flex justify-center p-0.5 w-24 h-8 animate-pulse bg-gray-100 rounded">

   
     </div>

     
        </div>       

     </header>


     <div>
     <p className="ml-16 h-2 w-32 rounded-md bg-gray-50">  </p>
     </div>

     <div className="m-2 flex flex-col gap-2 w-max ">
 
     </div>
     <p className="w-full  h-0.5 rounded-md   bg-gray-200" > </p>

        <br className="bg-black"/>
        <div className="flex  items-center justify-around text-center">
        
     
        <p className="h-3 w-6 rounded bg-gray-200  animate-pulse"> </p>
        <p className="h-3 w-6 rounded  bg-gray-200  animate-pulse"> </p>
        <p className="h-3 w-6 rounded bg-gray-200  animate-pulse"> </p>
        </div>

        <main className="flex flex-col items-center gap-2 mt-5 sm:mt-7   justify-center " >
               
               <div className="flex gap-2">
               <SkeletonSquare></SkeletonSquare>
                <SkeletonSquare></SkeletonSquare>
                <SkeletonSquare></SkeletonSquare>
               </div>

               <div className="flex gap-2">
               <SkeletonSquare></SkeletonSquare>
                <SkeletonSquare></SkeletonSquare>
                <SkeletonSquare></SkeletonSquare>
               </div>
          

             </main>
    </div> );
}
 
export default ProfileSkeleton;