import React from 'react';
import Router from './Components/Config/Router'
import Header from './Components/Header';
import './styles/index.scss';
import axios from 'axios';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            basket: {
                pizzas: [],
                meals: [],
                drinks: [],
                contact: ""
            }
        }
        this.addPizza = this.addPizza.bind(this);
        this.addMeal = this.addMeal.bind(this);
        this.addDrink = this.addDrink.bind(this);
        this.removePizza = this.removePizza.bind(this);
        this.removeMeal = this.removeMeal.bind(this);
        this.removeDrink = this.removeDrink.bind(this);
        this.setContact = this.setContact.bind(this);
        this.order = this.order.bind(this);
    }
    addPizza(pizza){
        const pizzas = this.state.basket.pizzas;
        pizza.itemID = pizzas.length +1;
        pizzas.push(pizza);
        console.log(this.state.basket);
    }
    removePizza(pizza){
        this.setState((state, props) => {
            const basket = state.basket;
            basket.pizzas = [...state.basket.pizzas.filter(x => x.itemID !== pizza.itemID)];
            return {
                basket: basket
              }
            });
    }
    addMeal(meal){
        const meals = this.state.basket.meals;
        meal.itemID = meals.length + 1;
        meals.push(meal);
    }
    removeMeal(meal){
        this.setState((state, props) => {
            const basket = state.basket;
            basket.meals = [...state.basket.meals.filter(x => x.itemID !== meal.itemID)];
            return {
                basket: basket
              }
            });
    }
    addDrink(drink){
        const drinks = this.state.basket.drinks;
        drink.itemID = drinks.length + 1;
        drinks.push(drink);
    }
    removeDrink(drink){
        this.setState((state, props) => {
            const basket = state.basket;
            basket.drinks = [...state.basket.drinks.filter(x => x.itemID !== drink.itemID)];
            return {
                basket: basket
              }
            });
    }
    setContact(contact){
        const basket = this.state.basket;
        basket.contact = contact;

        console.log(this.state.basket);
    }
    order(){
        const b = this.state.basket;
        const order = {
            contact: b.contact,
            pizzas: b.pizzas,
            meals: b.meals.map(x => x.id),
            drinks: b.drinks.map(x => x.id)
        };
        console.log(order);
        axios({
            method: 'post',
            url: '/order/add',
            data: order
        }).then(resp => console.log(resp)).catch(err => console.log(err));
    }
  render() {
    return (
      <div className="App">
        <Header />
        <Router addPizza={this.addPizza}
                addMeal={this.addMeal}
                addDrink={this.addDrink}
                removePizza={this.removePizza}
                removeMeal={this.removeMeal}
                removeDrink={this.removeDrink}
                setContact={this.setContact}
                order={this.order}
                basket={this.state.basket} />
      </div>
    );
  }
}

export default App;
