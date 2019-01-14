import React, { Component } from 'react';
import { Card, Button, Segment, Input, Header, Form, Label } from 'semantic-ui-react';
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
            ingredients: [],
            lastName: "",
            street: "",
            nr: "",
            town: "",
            contact: ""
        }
        console.log(props);

        this.order = this.order.bind(this)
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: '/api/ingredient/get',

          }).then(response => this.setState({
            ingredients: response.data.data,
            loadingI: false
          }));
    }
    order(){
        const { pizzas, meals, drinks } = this.props.basket;
        if(pizzas.length + meals.length + drinks.length < 1){
            return
        }
        this.setState({
            lastName: "",
            street: "",
            nr: "",
            town: "",
            contact: ""
        })
        this.props.order();
    }
  render() {
      const { pizzas, meals, drinks } = this.props.basket;
      const { removePizza, removeMeal, removeDrink } = this.props;
      const {loadingI, ingredients, lastName, street, nr, town, contact } = this.state;
      let price = 0;
      [...pizzas,...meals,...drinks].map(item => price += item.price);
      if(loadingI){
          return <Loader />
      }
      console.log(this.props.basket);
    return (
        <Segment basic>

        <Form onSubmit={() => this.order()}>
            <Form.Group>
                <Header>
                    Cena: {price} PLN
                </Header>
            </Form.Group>
            <Form.Group>
                <Form.Input required value={contact} pattern="[0-9]{9}" type="tel" label="Telefon" placeholder="123123123" onChange={(e) => {this.props.setContact(e.target.value); this.setState({contact:e.target.value})} } />
                    <Form.Input required value={lastName} label="Nazwisko" onChange={(e) => {this.props.setLastName(e.target.value); this.setState({lastName:e.target.value})}}/>
                    <Form.Input required value={town} label="Miasto" onChange={(e) => {this.props.setTown(e.target.value);this.setState({town:e.target.value})}} />
                    <Form.Input required value={street} label="Ulica" onChange={(e) => {this.props.setStreet(e.target.value);this.setState({street: e.target.value})}} />
                    <Form.Input required value={nr} patter="[0-9]{3}" label="Nr" onChange={(e) => {this.props.setNr(e.target.value); this.setState({nr:e.target.value})}} />
                <Button content="Zamów" disabled={pizzas.length + meals.length + drinks.length < 1} />
            </Form.Group>
        </Form>
        <Card.Group>
            {pizzas.map(p => <Item key={p.itemID} removeItem={removePizza} ingredients={p.ingredients} name={p.name} id={p.id} ings={ingredients} price={p.price} description={p.description} itemID={p.itemID} />)}
            {meals.map(m => <Item key={m.id} removeItem={removeMeal} name={m.name} id={m.id} description={m.description} price={m.price} itemID={m.itemID}/>)}
            {drinks.map(d => <Item key={d.id} removeItem={removeDrink} name={d.name} id={d.id} description={d.description} price={d.price} itemID={d.itemID}/>)}
        </Card.Group>
        </Segment>
    )
  }
}
