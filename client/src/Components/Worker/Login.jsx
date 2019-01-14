import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: "",
            password: ""
        };

        this.loginInputHandler = this.loginInputHandler.bind(this);
        this.passwordInputHandler = this.passwordInputHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loginInputHandler(e) {
        this.setState({
            login: e.target.value
        });
    }

    passwordInputHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit() {
        const { login, password } = this.state;
        this.props.login(login, password);
    }
    render() {
        console.log(this.props.logged);
        if (this.props.logged) {
            return <Redirect to="/worker" />
        }
        return (
            <div className="Login">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Input required label="login" type="text" onChange={(e) => this.loginInputHandler(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input required label="hasło" type="password" onChange={e => this.passwordInputHandler(e)} />
                    </Form.Group>
                    <Form.Group className="centered">
                        <Button content="ZALOGUJ" />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

