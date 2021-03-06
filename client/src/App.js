import React from 'react';
import Router from './Components/Config/Router'
import Header from './Components/Header';
import './styles/index.scss';
import axios from 'axios';
import RespondModal from './Components/Global/RespondModal';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            basket: {
                pizzas: [],
                meals: [],
                drinks: [],
                contact: "",
                lastName: "",
                street: "",
                town: "",
                nr: ""
            },
            logged: false,
            modal: false,
            modalMessage: "",
            modalHeader: ""
        }
        this.addPizza = this.addPizza.bind(this);
        this.addMeal = this.addMeal.bind(this);
        this.addDrink = this.addDrink.bind(this);
        this.removePizza = this.removePizza.bind(this);
        this.removeMeal = this.removeMeal.bind(this);
        this.removeDrink = this.removeDrink.bind(this);
        this.setContact = this.setContact.bind(this);
        this.order = this.order.bind(this);
        this.login = this.login.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setStreet = this.setStreet.bind(this);
        this.setTown = this.setTown.bind(this);
        this.setNr = this.setNr.bind(this);

    }
    addPizza(pizza){
        const pizzas = this.state.basket.pizzas;
        pizza.itemID = pizzas.length +1;
        pizzas.push(pizza);
        console.log(this.state.basket);
        this.setState({
            modal: true,
            modalHeader: "Dodano pizza",
            modalMessage: `Dodano do koszyka: ${pizza.name}`
        });
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
        this.setState({
            modal: true,
            modalHeader: "Dodano posiłek",
            modalMessage: `Dodano do koszyka: ${meal.name}`
        });
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
        this.setState({
            modal: true,
            modalHeader: "Dodano napój",
            modalMessage: `Dodano do koszyka: ${drink.name}`
        });
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
    setLastName(lastName){
        const basket = this.state.basket;
        basket.lastName = lastName;

        console.log(this.state.basket);
    }
    setTown(town){
        const basket = this.state.basket;
        basket.town = town;

        console.log(this.state.basket);
    }
    setStreet(street){
        const basket = this.state.basket;
        basket.street = street;

        console.log(this.state.basket);
    }
    setNr(nr){
        const basket = this.state.basket;
        basket.nr = nr;

        console.log(this.state.basket);
    }
    order(){
        const b = this.state.basket;
        const order = {
            contact: b.contact,
            town: b.town,
            street: b.street,
            nr: b.nr,
            lastName: b.lastName,
            pizzas: b.pizzas,
            meals: b.meals.map(x => x.id),
            drinks: b.drinks.map(x => x.id)
        };
        console.log({order});
        axios({
            method: 'post',
            url: '/api/order/add',
            data: order
        }).then(resp => {
            this.setState({
                basket: {
                    pizzas: [],
                    meals: [],
                    drinks: [],
                    contact: "",
                },
                modal: true,
                modalHeader: "Koszyk",
                modalMessage: "Twoje zamówenie zostało złożone"
            })
        }).catch(err => console.log(err));
    }
    login(login, password){
        console.log(login, password);
        if(login === "worker" && password === "worker"){
            this.setState({
                logged: true,
            }, () => console.log("logged"))
        }
    }
    closeModal(){
        this.setState({
            modal: false
        })
    }
  render() {
      console.log(this.state.logged);
    return (
      <div className="App">
        <Header />
        <RespondModal open={this.state.modal} close={this.closeModal} header={this.state.modalHeader} message={this.state.modalMessage}/>
        <Router addPizza={this.addPizza}
                addMeal={this.addMeal}
                addDrink={this.addDrink}
                removePizza={this.removePizza}
                removeMeal={this.removeMeal}
                removeDrink={this.removeDrink}
                setContact={this.setContact}
                setLastName={this.setLastName}
                setNr={this.setNr}
                setStreet={this.setStreet}
                setTown={this.setTown}
                order={this.order}
                login={this.login}
                logged={this.state.logged}
                basket={this.state.basket} />
      </div>
    );
  }
}

export default App;
