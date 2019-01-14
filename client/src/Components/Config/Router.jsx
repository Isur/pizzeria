
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import Homepage from '../Homepage';
import NotFound from '../NotFound';
import Pizza from '../Client/Pizza';
import Meal from '../Client/Meal';
import Basket from '../Basket';
import Drink from '../Client/Drink';
import Worker from '../Worker/Worker';
import Items from '../Worker/Items';
import Orders from '../Worker/Orders';
import Contact from '../Contact';
import PizzaItem from '../Client/Items/Pizza';
import OwnPizza from "../Client/OwnPizza";
import Login from "../Worker/Login";
// ROUTER
const Router = (props) => {
    console.log(props)
    return(
        <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/home" component={Homepage} />
            <Route exact path="/pizza" render={() => <Pizza addPizza={props.addPizza}/>} />
            <Route exact path="/pizza/:id" render={(x) => <PizzaItem {...x} addPizza={props.addPizza}/>} />
            <Route exact path="/meal" render={()=><Meal addMeal={props.addMeal}/>} />
            <Route exact path="/basket" render={()=> <Basket order={props.order} removeDrink={props.removeDrink} removePizza={props.removePizza} removeMeal={props.removeMeal} basket={props.basket} setContact={props.setContact}/>} />
            <Route exact path="/drink" render={()=><Drink addDrink={props.addDrink}/>} />
            <Route exact path="/worker" render={() => <Worker logged={props.logged} />} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/createpizza" render={() => <OwnPizza addPizza={props.addPizza}/>} />
            <Route exact path="/worker/items" render={() => <Items logged={props.logged} />} />
            <Route exact path="/worker/orders" render={() => <Orders logged={props.logged} />} />
            <Route exact path="/worker/login" render={() => <Login login={props.login} logged={props.logged}/>} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Router;
