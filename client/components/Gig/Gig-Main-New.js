import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR BOOKERS
// VIEW CREATE NEW GIG

const NewGig = (props) => {
  const { toggleView } = props;
  return (
    <div>
      <Button
        onClick={() =>
          toggleView('viewNewGigForm')
        }
        size="massive"
        className="sidebar-button"
      >Create New Booking
      </Button>
    </div>
  )
}

export default NewGig
