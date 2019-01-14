import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import PizzaEditor from './pizzaEditor';

export default class OwnPizza extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients:[],
            pizza: {},
            loadingP: true
        }
        this.setIngredients = this.setIngredients.bind(this);
    }
    componentDidMount(){

    }
    setIngredients(ingredients){
        let price = 0;
        ingredients.map(i => price += i.price)
        this.setState({
            ingredients: ingredients,
            pizza: {
                name: "WŁASNA",
                description: "WŁASNA",
                ingredients: ingredients.map(i => i._id),
                price: price
            }
        });
    }
  render() {
    return (
      <div>
        <PizzaEditor setIngredients={this.setIngredients} />
        <Button content="Dodaj do koszyka" onClick={() => this.props.addPizza(this.state.pizza)} disabled={this.state.ingredients < 1} />
        </div>
    )
  }
}
