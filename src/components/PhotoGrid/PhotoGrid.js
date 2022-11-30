import SquarePhoto from "../SquarePhoto/SquarePhoto";

const PhotoGrid = (props) => {
  const { posts } = props;

  return (
    <div>
      <div className="grid grid-cols-3 md:gap-1 xl:gap-4">
        {posts.map((p) => {
          return <SquarePhoto postID={p.id} imgUrl={p.imgUrl} key={p.id} />;
        })}
      </div>
    </div>
  );
};

export default PhotoGrid;
