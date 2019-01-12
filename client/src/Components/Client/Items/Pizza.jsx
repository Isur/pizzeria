import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import PizzaEditor from '../pizzaEditor';
import MyLoader from '../../Config/MyLoader';

export default class Pizza extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients:[],
            pizza: {},
            loadingP: true
        }
        console.log(props);
        this.setIngredients = this.setIngredients.bind(this);
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: '/pizza/get/'+this.props.match.params.id,

          }).then(response => this.setState({
            pizza: response.data.data,
            loadingP: false
          }));
    }
    setIngredients(ingredients){
        let price = this.state.price;
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
      if(this.state.loadingP){
          return <MyLoader />
      }
      console.log({"pizza": this.state.pizza})
      console.log();
    return (
      <div>
        <PizzaEditor setIngredients={this.setIngredients} currentPizza={this.state.pizza}/>
        <Button content="Dodaj do koszyka" />
        </div>
    )
  }
}
