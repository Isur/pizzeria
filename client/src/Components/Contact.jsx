import React, { Component } from 'react'
import { Segment, Message } from 'semantic-ui-react';
export default class Contact extends Component {
  render() {
      const message = ["super.pizza@pizza.com", "Gliwice, Kaszubska 23", "(+48) 123-412-123"]
    return (
      <Segment>
        <Message size="massive" header={"Kontakt"} list={message} />
      </Segment>
    )
  }
}
