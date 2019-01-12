import React, { Component } from 'react'
import { Segment, Button, Form, Item, Header} from 'semantic-ui-react';
import axios from 'axios';
export default class Ingredient extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        };
        this.getIngredients = this.getIngredients.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
    }
    componentDidMount = () => {
        this.getIngredients();
      }

      getIngredients = () => {
        axios({
            method: 'get',
            url: '/ingredient/get',
      
          }).then(response => this.setState({
            ingredients: response.data.data,
            loading: false
          }));
      }
      deleteIngredient = (id) => {
        axios({
            method: 'delete',
            url: '/ingredient/delete/'+id,
      
          }).then(response => this.getIngredients()).catch(err => console.log(err));
      }

    render() {
        const { loading, ingredients} = this.state;
        if(loading){
            return "Loading";
        }
        return (<>
            <Header>
                Dodaj nowy produkt:
            </Header>
            <AddIngredient refresh={this.getIngredients}/>
            <Segment compact className="ingredients">
                <Item.Group>
                    {ingredients.map(ingredient => <OneIngredient deleteIngredient={this.deleteIngredient} key={ingredient._id} ingredient={ingredient}/>)}
                </Item.Group>
            </Segment> 
            </>
        )
    }
};

const OneIngredient = (props) => {
    const { name, description, price, quantity, _id } = props.ingredient;
    const { deleteIngredient } = props;
    return (
        <Item>
            <Item.Content>
                <Item.Header>
                    {name}
                </Item.Header>
                <Item.Meta>
                    Liczba: {quantity}
                </Item.Meta>
                <Item.Description>
                    {description}
                </Item.Description>
                <Item.Extra>
                    {price} PLN
                    <Button floated="right" icon="trash" onClick={() => deleteIngredient(_id) }/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}


class AddIngredient extends Component {
  constructor(props){
      super(props);
      this.state = {
        name: "",
        price: 0,
        quantity: 0,
        desc: ""
      };
      this.inputHandler = this.inputHandler.bind(this);
      this.addIngredient = this.addIngredient.bind(this);
  }
  inputHandler = (e,d) => {
      this.setState({
          [d.name]: d.value
      }, () => 
      console.log(this.state)
      );
  }

  addIngredient = () => {
    const { name, price, quantity, desc } = this.state;
      axios({
        method: "post",
        url: "/ingredient/add",
        data: {
            name: name,
            quantity: quantity,
            price: price,
            description: desc
        }
      }).then(resp => {
          if(resp.data.success) this.props.refresh()
          else console.log(resp.data.message);
          this.setState({
            name: "",
            price: 0,
            quantity: 0,
            desc: ""
          });
        });
  }
    render() {
        const { name, price, quantity, desc } = this.state;
  return (
      <Form className="Ingredient" onSubmit={this.addIngredient}>
                <Form.Group>
                    <Form.Input required
                                name="name"
                                label="Nazwa"
                                placeholder="Nazwa"
                                onChange={this.inputHandler}
                                value={name} />
                    <Form.Input required
                                name="price"
                                min="0"
                                step="0.01"
                                label="Cena [PLN]"
                                type="number"
                                onChange={this.inputHandler}
                                value={price} />
                    <Form.Input required
                                name="quantity"
                                min="1"
                                label="Liczba"
                                type="number"
                                onChange={this.inputHandler}
                                value={quantity}/>
                    <Form.TextArea required
                                   label="Opis"
                                   name="desc"
                                   placeholder="Opis"
                                   onChange={this.inputHandler}
                                   value={desc} />
                </Form.Group>
                    <Form.Button content="Dodaj" />
            </Form>

    )
  }
}



