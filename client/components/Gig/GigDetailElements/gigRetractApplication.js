import React from 'react'
import { Button } from 'semantic-ui-react'

const GigRetractApplication = props => {
  const { handleRetractApplication } = props;
  return (
    <div>
        <Button
          size="massive"
          onClick={(event) => handleRetractApplication(event)}
          >Retract Booking Application
        </Button>
    </div>
  )
}

export default GigRetractApplication;
