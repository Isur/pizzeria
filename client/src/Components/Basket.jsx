import React, { Component } from 'react';
import { Card, Button, Segment, Input, Header } from 'semantic-ui-react';
import axios from 'axios';
import Loader from './Config/MyLoader';

const Item = (props) => {
    const { image, name, description, price, ingredients = [], ings, id, removeItem, itemID } = props;
    const ing = (ingredients || []).map(i => ings.find(x => x._id === i));
    return(
      <Card //image={}
            meta={ing.map(i=>`${i.name}, `)}
            header={name}
            description={description}
            extra={<>{price} PLN <Button onClick={(e) =>{e.preventDefault(); removeItem({name:name, itemID: itemID})}} icon="trash"/></>} />
    )
}

export default class Basket extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingI: true,
            ingredients: []
        }
        console.log(props);
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: '/ingredient/get',

          }).then(response => this.setState({
            ingredients: response.data.data,
            loadingI: false
          }));
    }
    order(){
       this.props.order();
    }
  render() {
      const { pizzas, meals, drinks } = this.props.basket;
      const { removePizza, removeMeal, removeDrink } = this.props;
      const {loadingI, ingredients} = this.state;
      let price = 0;
      [...pizzas,...meals,...drinks].map(item => price += item.price);
      if(loadingI){
          return <Loader />
      }
      console.log(this.props.basket);
    return (
        <Segment>

        <Header>
              Cena: {price} PLN
        </Header>
        <Header>

        <Input label="Mail" type="mail"
        onChange={(e) => this.props.setContact(e.target.value) }/>
        </Header>
        <Header >

         <Button content="Zamów" onClick={() => this.order()}/>
        </Header>

        <Card.Group>
            {pizzas.map(p => <Item key={p.itemID} removeItem={removePizza} ingredients={p.ingredients} name={p.name} id={p.id} ings={ingredients} price={p.price} description={p.description} itemID={p.itemID} />)}
            {meals.map(m => <Item key={m.id} removeItem={removeMeal} name={m.name} id={m.id} description={m.description} price={m.price} itemID={m.itemID}/>)}
            {drinks.map(d => <Item key={d.id} removeItem={removeDrink} name={d.name} id={d.id} description={d.description} price={d.price} itemID={d.itemID}/>)}
        </Card.Group>
        </Segment>
    )
  }
}
