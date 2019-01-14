import React, { Component } from 'react'
import { Input, Dropdown, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';
import MyLoader from '../Config/MyLoader';

const IngredientPanel = (props) => {
    return(
        <Segment>
            {props.name}
            {/* <Button icon="plus" onClick={(e) =>{ e.preventDefault(); props.plus(props.id);}} /> */}
            {/* {props.quantity} */}
            {/* <Button icon="minus" onClick={(e) =>{ e.preventDefault(); props.minus(props.id);}} /> */}
            <Button icon="trash" onClick={(e) =>{ e.preventDefault(); props.remove(props.id);}} />
        </Segment>
    )
}

export default class pizzaEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          ingredients: [],
          listed: [],
          currentPizza: this.props.currentPizza || {},
        }
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
        this.comparer = this.comparer.bind(this);
        this.addIngredients = this.addIngredients.bind(this);
      }
      componentDidMount = () => {
        axios({
          method: 'get',
          url: '/ingredient/get',

        }).then(response => {
            this.setState({
                ingredients: response.data.data,
                loading: false
            }, () => {
                console.log(this.state.currentPizza.ingredients);
                console.log(this.state.ingredients);
                this.addIngredients(this.state.currentPizza.ingredients || []);
            })
        });
      }

      addIngredients(ids){
        console.log(ids);
        const {listed, ingredients} = this.state;
        const items = ids.map(id => ingredients.find(x => x._id === id));
        const items2 = items.map(it => {return {_id: it._id, name: it.name, quantity: 0, price: it.price}})
        this.setState({listed: [...listed, ...items2]}, () => this.props.setIngredients(this.state.listed));
        console.log(items, items2);
      }

    addIngredient(id){
        const {listed, ingredients} = this.state;
        const item = ingredients.find(x => x._id === id) || {};
        const item2 = {_id: item._id, name: item.name, quantity: 0, price: item.price};
        console.log(item2)
        this.setState({listed: [...listed, item2]},()=> {
            this.props.setIngredients(this.state.listed)
        }, () => console.log(this.state.listed));
    }
    removeIngredient(id){
        const list = this.state.listed.filter(x => x._id !== id);
        this.setState({listed: list},()=> this.props.setIngredients(this.state.listed));
    };
    plus(id){
        const { listed } = this.state;
        const item = listed.find(x => x._id === id);
        item.quantity++;
        this.props.setIngredients(listed);
    };
    minus(id){
        const { listed } = this.state;
        const item = listed.find(x => x._id === id);
        if(item.quantity > 0) item.quantity--;
        this.props.setIngredients(listed);
    };
    comparer(id){
        const item = this.state.listed.find(x => x._id === id);
        return item
    }
  render() {
      if(this.state.loading){
          return <MyLoader />
      }

    const i = this.state.ingredients.map(ing => {
        if(!this.comparer(ing._id)){
            return <Dropdown.Item key={ing._id} text={ing.name} description={ing.quantity} onClick={() => this.addIngredient(ing._id)}/>
        };
    });
    return (
      <div>
        <Dropdown text="Wybierz składnik!" onChange={this.addIngredient} button>
            <Dropdown.Menu>
                {i}
            </Dropdown.Menu>
        </Dropdown>
       {this.state.listed.map(ing => <IngredientPanel key={ing._id} quantity={ing.quantity} plus={this.plus} minus={this.minus} name={ing.name} id={ing._id} remove={this.removeIngredient}/>)}
      </div>
    )
  }
}
