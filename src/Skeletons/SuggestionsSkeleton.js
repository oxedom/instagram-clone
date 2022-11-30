import React from "react";
import ContentLoader from "react-content-loader";

const SuggestionsSkeleton = (props) => (
  <ContentLoader
    width={450}
    height={130}
    viewBox="0 0 500 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  ></ContentLoader>
);

export default SuggestionsSkeleton;
