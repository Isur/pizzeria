import React, { Component } from 'react'
import { Segment, Button, Form, Item, Header} from 'semantic-ui-react';
import axios from 'axios';
import MyLoader from '../../Config/MyLoader';
export default class Meal extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        };
        this.getMeals = this.getMeals.bind(this);
        this.deleteMeal = this.deleteMeal.bind(this);
    }
    componentDidMount = () => {
        this.getMeals();
      }

      getMeals = () => {
        axios({
            method: 'get',
            url: '/api/meal/get',

          }).then(response => this.setState({
            meals: response.data.data,
            loading: false
          }));
      }
      deleteMeal = (id) => {
        axios({
            method: 'delete',
            url: '/api/meal/delete/'+id,

          }).then(response => this.getMeals()).catch(err => console.log(err));
      }

    render() {
        const {loading, meals} = this.state;
        if(loading){
            return <MyLoader />
        }
        return (<>
            <Header>
                Dodaj nowy produkt:
            </Header>
            <AddMeal refresh={this.getMeals}/>
            <Segment compact>
                <Item.Group relaxed="very">
                    {meals.map(meal => <OneMeal deleteMeal={this.deleteMeal} key={meal._id} meal={meal}/>)}
                </Item.Group>
            </Segment>
            </>
        )
    }
};

const OneMeal = (props) => {
    const { name, description, price, quantity, _id } = props.meal;
    const { deleteMeal } = props;
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
                    <Button floated="right" icon="trash" onClick={() => deleteMeal(_id) }/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}


class AddMeal extends Component {
  constructor(props){
      super(props);
      this.state = {
        name: "",
        price: 0,
        quantity: 0,
        desc: ""
      };
      this.inputHandler = this.inputHandler.bind(this);
      this.addMeal = this.addMeal.bind(this);
  }
  inputHandler = (e,d) => {
      this.setState({
          [d.name]: d.value
      }, () =>
      console.log(this.state)
      );
  }

  addMeal = () => {
    const { name, price, quantity, desc } = this.state;
      axios({
        method: "post",
        url: "/meal/add",
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
      <Form className="Meal" onSubmit={this.addMeal}>
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



