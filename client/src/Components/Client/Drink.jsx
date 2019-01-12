import React, { Component } from 'react'
import { Card, Segment, Button } from 'semantic-ui-react';
import drinkImg from '../../images/drink.jpg';
import axios from 'axios';
import MyLoader from '../Config/MyLoader';

const CardDrink = (props) => {
  const { image, name, description, price, id } = props;
  return(
    <Card image={drinkImg}
          header={name}
          description={description}
          extra={<>{price} PLN <Button onClick={(e)=>{e.preventDefault();props.addDrink({id, name, description, price})}} icon="shopping cart"/></>} />
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
      return <MyLoader />
    }
    return (
      <Segment>

        <Card.Group centered>
          {this.state.drinks.map(drink => <CardDrink key={drink._id} addDrink={this.props.addDrink} id={drink._id} name={drink.name} description={drink.description} price={drink.price} />)}
        </Card.Group>
      </Segment>
    )
  }
}
