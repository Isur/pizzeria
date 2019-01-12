import React, { Component } from 'react'
import { Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class Homepage extends Component {
  render() {
    return (
      <Segment placeholder size="massive" className="Homepage">
        <Grid columns={2} stackable textAlign="center" verticalAlign="middle">
            <Grid.Row verticalAlign="middle">
                <Grid.Column as={Link} to="/pizza" className="gridCol">
                <Header icon>
                    <Icon name="heart" />
                    Pizza
                    </Header>
                </Grid.Column>
                <Divider vertical />
                <Grid.Column as={Link} to="/meal" className="gridCol">
                <Header icon>
                    <Icon name="food" />
                    Obiad
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row verticalAlign="middle">
            <Grid.Column as={Link} to="/drink" className="gridCol">
            <Header icon>
                    <Icon name="coffee" />
                    Napój
                    </Header>
                </Grid.Column>
                <Divider vertical />
                <Grid.Column as={Link} to="/createpizza" className="gridCol">
                    <Header icon>
                    <Icon name="lab" />
                    Własna Pizza
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row verticalAlign="middle">
            <Grid.Column as={Link} to="/basket" className="gridCol">
            <Header icon>
                    <Icon name="shopping cart" />
                    Twój koszyk
                    </Header>
                </Grid.Column>
                </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}
