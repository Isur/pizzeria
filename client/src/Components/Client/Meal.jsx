import React, { Component } from 'react'
import { Card, Segment, Button } from 'semantic-ui-react';
import mealImg from '../../images/meal.jpg';
import axios from 'axios';
import MyLoader from '../Config/MyLoader';

const CardMeal = (props) => {
  const { image, name, description, price, id } = props;
  return(
    <Card image={mealImg}
          header={name}
          description={description}
          extra={<>{price} PLN <Button onClick={(e)=>{e.preventDefault();props.addMeal({id, name, description, price})}} icon="shopping cart"/></>} />
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
      url: '/api/meal/get',

    }).then(response => this.setState({
      meals: response.data.data,
      loading: false
    }));
  }
  render() {
    if(this.state.loading === true){
      return <MyLoader />
    }
    return (
      <Segment>

        <Card.Group centered>
          {this.state.meals.map(meal => <CardMeal key={meal._id} addMeal={this.props.addMeal} id={meal._id} name={meal.name} description={meal.description} price={meal.price} />)}
        </Card.Group>
      </Segment>
    )
  }
}
