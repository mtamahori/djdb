import React from 'react'
import { Icon } from 'semantic-ui-react'
require('../../public/stylesheets/landing.css')

const Landing = () => {
  return (
    <div className="landing-container">
    <Icon.Group className="landing-icons" size='huge'>
      <Icon loading size='big' name='circle notch' />
      <Icon name='music' />
    </Icon.Group>
    </div>
  )
}

export default Landing
