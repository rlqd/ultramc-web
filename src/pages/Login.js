import React from 'react';
import axios from 'axios';
import nprogress from 'nprogress';

import './Login.scss';

import { Form, InputGroup } from '../components/Forms';

export default class Login extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
        };
    }

    attemptLogin = async function(e, data) {
        e.preventDefault();
        if (data && data.name && data.password) {
            this.setState({error: null});
            nprogress.start();
            try {
                var res = await axios.get('/auth.json');
                if (res.data.success) {
                    this.props.onAuth(res.data.user);
                } else {
                    this.setState({error: res.data.error});
                }
            } catch (error) {
                this.setState({error: String(error)});
            }
            nprogress.done();
        } else {
            this.setState({error: 'Заполните поля Логин и Пароль'});
        }
    }.bind(this);

    renderError() {
        if (this.state.error) {
            return <InputGroup type="hint" value={this.state.error} />;
        }
    }

    render() {
        return (
            <div className="content" style={{maxWidth: '500px'}}>
                <div className="hello">Добро пожаловать</div>
                <Form onSubmit={this.attemptLogin}>
                    <InputGroup label="Логин" name="name" type="text" />
                    <InputGroup label="Пароль" name="password" type="password" />
                    <InputGroup type="submit" value="Войти" />
                    {this.renderError()}
                </Form>
            </div>
        );
    }
}
