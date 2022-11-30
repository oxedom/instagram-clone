import ContentLoader from "react-content-loader";
import React from "react";

const PostSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={700}
    viewBox="0 -10 400 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="26" cy="26" r="24" />
    <rect x="63" y="18" rx="2" ry="2" width="140" height="21" />
    <rect x="0" y="60" rx="2" ry="2" width="400" height="680" />
  </ContentLoader>
);

export default PostSkeleton;
