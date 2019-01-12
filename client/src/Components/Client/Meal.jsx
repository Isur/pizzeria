import React, { Component } from 'react'
import { Card, Segment } from 'semantic-ui-react';
import mealImg from '../../images/meal.jpg';
import axios from 'axios';

const CardMeal = (props) => {
  const { image, name, description, price } = props;
  return(
    <Card image={mealImg} 
          header={name}
          description={description}
          extra={price + " PLN"} />
  )
}

export default class Meal extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount = () => {
    axios({
      method: 'get',
      url: '/meal/get',

    }).then(response => this.setState({
      meals: response.data.data,
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
          {this.state.meals.map(meal => <CardMeal name={meal.name} description={meal.description} price={meal.price} />)}
        </Card.Group>
      </Segment>
    )
  }
}
