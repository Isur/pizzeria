import React, { Component } from 'react'
import axios from 'axios';
import MyLoader from '../Config/MyLoader';
import {orderState} from '../../Components/Config/enum';
import { Segment, Grid, Header, Divider, Button, Message } from 'semantic-ui-react';
import pizzaEditor from '../Client/pizzaEditor';
import { Redirect } from 'react-router-dom';


class PizzaIngredients extends Component {
    constructor(props) {
      super(props)

      this.state = {
         open: false,
         pizzas: []
      }
      this.buttonHandler= this.buttonHandler.bind(this);
    }
    buttonHandler(e){
        e.stopPropagation();
        this.props.pizzaDetails(e,this.props.pizza.ingredients)
    }
    pizzaDetails(e, ids){
        e.stopPropagation();
        this.setState({ open: !this.state.open})
        this.getIngredients(ids);
    }
    getIngredients(ids){
        if(ids.length > 0){
            axios({
                method: "get",
                url: "/ingredient/get/"+ids[0]
            }).then(resp => {
                this.setState({
                    pizzas:[...this.state.pizzas, resp.data.data],
                }, () =>{
                    ids.shift();
                    this.getIngredients(ids);
                })
            });
        }else{
            console.log(this.state.pizzas);
            return
        }
    }
  render() {
      if(this.props.logged === false){
        return <Redirect to="/worker/login" />;
      }
    return (
        <>
        <Button onClick={(e)=>this.pizzaDetails(e, this.props.pizza.ingredients)}>{this.props.pizza.name}</Button>
      <Message hidden={!this.state.open}>
        {this.state.pizzas.map(i => <p>{i.name}</p>)}
      </Message>
      </>
    )
  }
}


class OrderRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            hiddenMessage: true,
            drinks: [],
            meals: [],
            pizzas: [],
        }
        this.open = this.open.bind(this);
    }

    componentDidMount(){
        const order = this.props.order;
        this.setState({
            dl: order.drinks.length,
            ml: order.meals.length,
            pl: order.pizzas.length
        })
    }

    getPizzas(pizzas){
        if(pizzas.length > 0){
            this.getIngredients(pizzas[0].ingredients);
            pizzas.shift();
            this.setState({
                pizzas:[...this.state.pizzas, {break: true}]
            })
            this.getPizzas(pizzas);
        }else{
            return;
        }
    }



    getMeals(ids){
        if(ids.length > 0){
            axios({
                method: "get",
                url: "/meal/get/"+ids[0]
            }).then(resp => {
                this.setState({
                    meals: [...this.state.meals, resp.data.data]
                }, () =>{
                    ids.shift();
                    this.getMeals(ids);
                })
            });
        }else{
            return
        }
    }

    getDrinks(ids){
        if(ids.length > 0){
            axios({
                method: "get",
                url: "/drink/get/"+ids[0]
            }).then(resp => {
                this.setState({
                    drinks: [...this.state.drinks, resp.data.data]
                }, () =>{
                    ids.shift();
                    this.getDrinks(ids);
                })
            });
        }else{
            return
        }
    }

    open(){
        const order = this.props.order;
        this.setState({hiddenMessage: !this.state.hiddenMessage})
        this.getMeals(order.meals);
        this.getDrinks(order.drinks);
    }

accept(){
    axios({
        method: "patch",
        url: "/order/update",
        data:{
            id: this.props.order._id
        }
    }).then(res => this.props.refresh());
}
reject(){
    axios({
        method: "delete",
        url: "/order/delete/"+this.props.order._id,
    }).then(res => this.props.refresh());
}
send(){
    axios({
        method: "patch",
        url: "/order/update",
        data:{
            id: this.props.order._id
        }
    }).then(res => this.props.refresh());
}

   render(){
    if(this.props.logged === false){
        return <Redirect to="/worker/login" />
    }
    const order = this.props.order;
    const {hiddenMessage, drinks, meals, dl, ml, pl} = this.state;
    let buttons;
    console.log(order.orderState);
    if(order.orderState === orderState.PENDING){
        buttons = <>
            <Button positive content="Akceptuj" onClick={(e)=>{e.stopPropagation(); this.accept();}}/>
            <Button negative content="Odrzuć" onClick={(e)=>{e.stopPropagation(); this.reject();}}/>
        </>
    } else if(order.orderState === orderState.ACCEPTED){
        buttons = <Button positive content="WYŚLIJ" onClick={(e)=>{e.stopPropagation(); this.send();}} />
    } else if(order.orderState === orderState.SENT){
        buttons = <Button color="blue" content="ODEBRANE" onClick={(e)=>{e.stopPropagation(); this.send();}} />
    }  else if(order.orderState === orderState.RECEIVED){
        buttons = <Button color="blue" icon="trash" content="ZAKOŃCZONO" onClick={(e)=>{e.stopPropagation(); this.reject();}} />
    }
    return(
        <Grid.Row onClick={this.open}>
            <Grid.Column>
                {buttons}
                {(order.orderState === orderState.PENDING || order.orderState === orderState.ACCEPTED) && order.contact}
            </Grid.Column>
            <Grid.Column>
                Dania: {ml}
                <Message hidden={hiddenMessage}>
                {meals.map(d => <p>{d.name}</p>)}
            </Message>
            </Grid.Column>
            <Grid.Column>
               Napoje: {dl}
               <Message hidden={hiddenMessage}>
                {drinks.map(d => <p>{d.name}</p>)}
            </Message>
            </Grid.Column>
            <Grid.Column>
                Pizze: {pl}
                <Message hidden={hiddenMessage}>
                {order.pizzas.map(p => {
                    return <PizzaIngredients pizzaDetails={this.pizzaDetails} pizza={p} />
                    })}
            </Message>
            </Grid.Column>


        </Grid.Row>
    )
}
}

export default class Orders extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            loading: true
        };
        this.getOrders = this.getOrders.bind(this);
    }
    componentDidMount(){
        this.getOrders();
    }
    getOrders(){
        this.setState({loading: true}, ()=>{

            axios({
                method: 'get',
                url: '/api/order/get'
            }).then(resp => {
                this.setState({
                    orders: resp.data.data,
                    loading: false
                })
            })
        });
    }
  render() {
      if(this.props.logged === false){
          return <Redirect to="/worker/login" />
      }
      if(this.state.loading){
          return <MyLoader />
      }
      const {orders} = this.state;
      console.log(orders);

    return (
      <Segment placeholder size="massive">
        <Grid columns={4} stackable textAlign="center">
            {orders.map(o => <OrderRow order={o} refresh={this.getOrders}/>)}

        </Grid>
      </Segment>
    )
  }
}
