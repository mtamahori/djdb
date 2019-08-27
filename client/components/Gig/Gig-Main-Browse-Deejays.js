import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR BOOKERS
// BROWSE DEEJAYS USING SEARCH/FILTER
// RENDERED IN BookerMain

const BrowseDeejayList = (props) => {
  const { toggleView } = props;
  return (
    <div>
      <Button
      onClick={() => {
        toggleView('viewBrowseDeejays')
      }}
      className="sidebar-button"
      size="massive">
      Browse Deejays
      </Button>
    </div>
  )
}

export default BrowseDeejayList
