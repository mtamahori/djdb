import React from 'react'
import { Button } from 'semantic-ui-react'
require('../../../public/stylesheets/sidebar.css')

// FOR DEEJAYS
// BROWSE OPEN GIGS
// RENDERED IN DeejayMain

const BrowseGigList = (props) => {
  const { toggleView } = props;
  return (
    <div>
        <Button
          onClick={() => toggleView('viewBrowseGigs')}
          className="sidebar-button"
          size="massive"
        >Browse Gigs
        </Button>
    </div>
  )
}

export default BrowseGigList;
