import React, { Component } from 'react'
import { Segment, Button, Form, Item, Header} from 'semantic-ui-react';
import PizzaEditor from '../../Client/pizzaEditor';
import axios from 'axios';
import MyLoader from '../../Config/MyLoader';
export default class Pizza extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingP: true,
            loadingI: true,
        };
        this.getPizzas = this.getPizzas.bind(this);
        this.deletePizza = this.deletePizza.bind(this);
    }
    componentDidMount = () => {
        this.getPizzas();
        this.getIngredients();
      }

      getPizzas = () => {
        axios({
            method: 'get',
            url: '/api/pizza/get',

          }).then(response => this.setState({
            pizzas: response.data.data,
            loadingP: false
          }));
      }
      getIngredients(){
        axios({
            method: 'get',
            url: '/api/ingredient/get',

          }).then(response => this.setState({
            ings: response.data.data,
            loadingI: false
          }));
      }
      deletePizza = (id) => {
        axios({
            method: 'delete',
            url: '/api/pizza/delete/'+id,

          }).then(response => this.getPizzas()).catch(err => console.log(err));
      }

    render() {
        const {loadingP, loadingI, pizzas, ings} = this.state;
        if(loadingP || loadingI){
            return <MyLoader />
        }
        return (<>
            <Header>
                Dodaj nowy produkt:
            </Header>
            <AddPizza refresh={this.getPizzas}/>
            <Segment compact>
                <Item.Group relaxed="very">
                    {pizzas.map(pizza => <OnePizza ings={ings} deletePizza={this.deletePizza} key={pizza._id} pizza={pizza}/>)}
                </Item.Group>
            </Segment>
            </>
        )
    }
};

const OnePizza = (props) => {
    const { name, description, price, ingredients, _id } = props.pizza;
    const { deletePizza, ings } = props;
    const ing = ingredients.map(i => ings.find(x => x._id === i));
    return (
        <Item>
            <Item.Content>
                <Item.Header>
                    {name}
                </Item.Header>
                <Item.Meta>
                {ing.map(ig => <p>{ig.name}</p>)}
                </Item.Meta>
                <Item.Description>
                    {description}
                </Item.Description>
                <Item.Extra>
                    {price} PLN
                    <Button floated="right" icon="trash" onClick={() => deletePizza(_id) }/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}


class AddPizza extends Component {
  constructor(props){
      super(props);
      this.state = {
        name: "",
        price: 0,
        quantity: 0,
        desc: "",
        ingredients: []
      };
      this.inputHandler = this.inputHandler.bind(this);
      this.addPizza = this.addPizza.bind(this);
      this.setPizzaIngredients = this.setPizzaIngredients.bind(this);
  }


  inputHandler = (e,d) => {
      this.setState({
          [d.name]: d.value
      }, () =>
      console.log(this.state)
      );
  }
  setPizzaIngredients = (ingredients) => {
      console.log({ingredients});
      this.setState({
          ingredients: ingredients,
      })
  }

  addPizza = () => {
    const { name, price, ingredients, desc } = this.state;
    console.log(ingredients);
      axios({
        method: "post",
        url: "/pizza/add",
        data: {
            name: name,
            ingredients: ingredients,
            price: price,
            description: desc
        }
      }).then(resp => {
          if(resp.data.success) this.props.refresh()
          else console.log(resp.data.message);
          this.setState({
            name: "",
            price: 0,
            desc: ""
          });
        });
  }
    render() {
        const { name, price, quantity, desc, loading, ingredients } = this.state;
        if(loading){
            return "loading";
        }
        console.log({ingredients});
  return (
      <Form className="Pizza" onSubmit={this.addPizza}>
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
                    <Form.TextArea required
                                   label="Opis"
                                   name="desc"
                                   placeholder="Opis"
                                   onChange={this.inputHandler}
                                   value={desc} />
                </Form.Group>
                    <PizzaEditor setIngredients={this.setPizzaIngredients}/>
                    <Form.Button content="Dodaj" />
            </Form>

    )
  }
}



