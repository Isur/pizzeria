import React, { Component } from 'react'
import { Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class Worker extends Component {
  render() {
    return (
        <Segment placeholder size="massive">
    <Grid container columns={1} stackable textAlign='center' verticalAlign="middle">

      <Grid.Row verticalAlign='middle'>
        <Grid.Column as={Link} to="/worker/items">
          <Header icon>
            <Icon name='search' />
            Produkty
          </Header>

        </Grid.Column>
        </Grid.Row>
        <Divider />
<Grid.Row>
        <Grid.Column as={Link} to="/worker/orders" >
          <Header icon>
            <Icon name='world' />
            Zamówienia
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
    )
  }
}
