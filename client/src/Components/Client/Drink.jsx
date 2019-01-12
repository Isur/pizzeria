import React, { Component } from 'react'
import { Card, Segment } from 'semantic-ui-react';
import drinkImg from '../../images/drink.jpg';
import axios from 'axios';

const CardDrink = (props) => {
  const { image, name, description, price } = props;
  return(
    <Card image={drinkImg} 
          header={name}
          description={description}
          extra={price + " PLN"} />
  )
}

export default class Drink extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount = () => {
    axios({
      method: 'get',
      url: '/drink/get',

    }).then(response => this.setState({
      drinks: response.data.data,
      loading: false
    }));
  }
  render() {
    if(this.state.loading === true){
      return "LOADING";
    }
    return (
      <Segment>

        <Card.Group centered>
          {this.state.drinks.map(drink => <CardDrink name={drink.name} description={drink.description} price={drink.price} />)}
        </Card.Group>
      </Segment>
    )
  }
}
