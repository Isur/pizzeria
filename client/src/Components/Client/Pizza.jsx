import React, { Component } from 'react'
import { Card, Segment } from 'semantic-ui-react';
import pizzaImg from '../../images/pizza.jpg';
import axios from 'axios';

const CardPizza = (props) => {
  const { image, name, description, price, ingredients, ings } = props;
  const ing = ingredients.map(i => ings.find(x => x._id === i));
  return(
    <Card image={pizzaImg} 
          meta={ing.map(i=>`${i.name}, `)}
          header={name}
          description={description}
          extra={price + " PLN"} />
  )
}

export default class Pizza extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadingI: true,
      loadingP: true
    }
  }
  componentDidMount = () => {
    axios({
      method: 'get',
      url: '/pizza/get',

    }).then(response => this.setState({
      pizzas: response.data.data,
      loadingP: false
    }));
    axios({
      method: 'get',
      url: '/ingredient/get',

    }).then(response => this.setState({
      ingredients: response.data.data,
      loadingI: false
    }));
  }
  render() {
    if(this.state.loadingI || this.state.loadingP){
      return "LOADING";
    }
    return (
      <Segment>

        <Card.Group centered>
          {this.state.pizzas.map(pizza => <CardPizza name={pizza.name} description={pizza.description} price={pizza.price} ingredients={pizza.ingredients} ings={this.state.ingredients} />)}
        </Card.Group>
      </Segment>
    )
  }
}
