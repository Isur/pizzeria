import React, { Component } from 'react'
import Drink from "./Items/Drink";
import Meal from "./Items/Meal";
import Pizza from "./Items/Pizza";
import Ingredients from "./Items/Ingredients";
import { Tab } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const panes = [
    {menuItem: "Pizza", render: () => <Tab.Pane> <Pizza /> </Tab.Pane>},
    {menuItem: "Dania", render: () => <Tab.Pane> <Meal /> </Tab.Pane>},
    {menuItem: "Napoje", render: () => <Tab.Pane> <Drink /> </Tab.Pane>},
    {menuItem: "Składniki", render: () => <Tab.Pane> <Ingredients /> </Tab.Pane>},
]
export default class Items extends Component {

    render() {
        if(this.props.logged === false){
            return <Redirect to="/worker/login" />
        }
        return (
            <Tab panes={panes} />
        )
    }
}
