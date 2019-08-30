import React from 'react'
import { Button } from 'semantic-ui-react'
require('../../../public/stylesheets/sidebar.css')

// FOR DEEJAYS
// BROWSE BOOKERS USING SEARCH/FILTER
// RENDERED IN DeejayMain

const BrowseBookerList = (props) => {
  const { toggleView } = props;
  return (
    <div>
      <Button
        onClick={() => toggleView('viewBrowseBookers')}
        className="sidebar-button"
        size="massive"
      >Browse Bookers
      </Button>
    </div>
  )
}

export default BrowseBookerList
