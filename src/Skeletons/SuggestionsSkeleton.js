import React from 'react'
import ContentLoader from 'react-content-loader'

const SuggestionsSkeleton = props => (
  <ContentLoader
    width={500}
    height={100}
    viewBox="10 0 500 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >

  </ContentLoader>
)

export default SuggestionsSkeleton;