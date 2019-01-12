import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';
export default class MyLoader extends Component {
  render() {
    return (
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
    )
  }
}
