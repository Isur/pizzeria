import React, { Component } from 'react'
import { Segment, Button, Form, Item, Header} from 'semantic-ui-react';
import axios from 'axios';
import MyLoader from '../../Config/MyLoader';
export default class Drink extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        };
        this.getDrinks = this.getDrinks.bind(this);
        this.deleteDrink = this.deleteDrink.bind(this);
    }
    componentDidMount = () => {
        this.getDrinks();
      }

      getDrinks = () => {
        axios({
            method: 'get',
            url: '/api/drink/get',

          }).then(response => this.setState({
            drinks: response.data.data,
            loading: false
          }));
      }
      deleteDrink = (id) => {
        axios({
            method: 'delete',
            url: '/api/drink/delete/'+id,

          }).then(response => this.getDrinks()).catch(err => console.log(err));
      }

    render() {
        const { loading, drinks} = this.state;
        if(loading){
            return <MyLoader />
        }
        return (<>
            <Header>
                Dodaj nowy produkt:
            </Header>
            <AddDrink refresh={this.getDrinks}/>
            <Segment compact className="drinks">
                <Item.Group>
                    {drinks.map(drink => <OneDrink deleteDrink={this.deleteDrink} key={drink._id} drink={drink}/>)}
                </Item.Group>
            </Segment>
            </>
        )
    }
};

const OneDrink = (props) => {
    const { name, description, price, quantity, _id } = props.drink;
    const { deleteDrink } = props;
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
                    <Button floated="right" icon="trash" onClick={() => deleteDrink(_id) }/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}


class AddDrink extends Component {
  constructor(props){
      super(props);
      this.state = {
        name: "",
        price: 0,
        quantity: 0,
        desc: ""
      };
      this.inputHandler = this.inputHandler.bind(this);
      this.addDrink = this.addDrink.bind(this);
  }
  inputHandler = (e,d) => {
      this.setState({
          [d.name]: d.value
      }, () =>
      console.log(this.state)
      );
  }

  addDrink = () => {
    const { name, price, quantity, desc } = this.state;
      axios({
        method: "post",
        url: "/drink/add",
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
      <Form className="Drink" onSubmit={this.addDrink}>
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



