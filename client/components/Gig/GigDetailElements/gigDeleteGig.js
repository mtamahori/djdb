import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR BOOKERS TO DELETE GIG

const GigDeleteGig = props => {
  const { handleDeleteGig } = props;
  return (
    <div>
      <Button
        size="massive"
        onClick={(event) => handleDeleteGig(event)}
        >Delete Gig
      </Button>
    </div>
  )
}

export default GigDeleteGig;
