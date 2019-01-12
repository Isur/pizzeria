import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Worker extends Component {
  render() {
    return (
      <div>
        <Button as={Link} to="/worker/items" content="PRODUKTY"/>
        <Button as={Link} to="/worker/orders" content="ZAMÓWNIENIA"/>
      </div>
    )
  }
}
