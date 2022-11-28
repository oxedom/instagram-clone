import React from "react"
import ContentLoader from "react-content-loader"

const PhotoGridSkeleton = (props) => (
  <ContentLoader
        speed={2}
    width={1250}
    height={500}
    viewBox="0 0 1280 460"
    backgroundColor="#ffffff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="257" rx="0" ry="" width="350" height="750" /> 
    <rect x="375" y="257" rx="0" ry="" width="350" height="500" />
    <rect x="750" y="257" rx="0" ry="" width="350" height="500" /> 
  </ContentLoader>
)

export default PhotoGridSkeleton