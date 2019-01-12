
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
import PizzaEditor from '../Client/pizzaEditor';
// ROUTER
const Router = (props) => {
    return(
        <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/home" component={Homepage} />
            <Route exact path="/pizza" component={Pizza} />
            <Route exact path="/meal" component={Meal} />
            <Route exact path="/basket" component={Basket} />
            <Route exact path="/drink" component={Drink} />
            <Route exact path="/worker" component={Worker} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/createpizza" component={PizzaEditor} />
            <Route exact path="/worker/items" component={Items} />
            <Route exact path="/worker/orders" component={Orders} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Router;