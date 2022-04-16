import React from 'react';
import axios from 'axios';
import nprogress from 'nprogress';

import './Login.scss';

import { Form, InputGroup } from '../components/Forms';
import Window from '../components/Window';
import FooterDownload from './elements/FooterDownload';

export default class Login extends React.Component {

    errorMap = {
        missingParameters: 'Заполните поля Логин и Пароль',
        userNotFound: 'Пользователь не найден',
        incorrectPassword: 'Пароль не совпадает',
        unknownError: 'Неизвестная ошибка',
    };

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
            var err = await this.props.user.authenticate(data.name, data.password);
            if (err !== true) {
                this.setState({error: this.errorMap[err] ?? err});
            }
        } else {
            this.setState({error: this.errorMap.missingParameters});
        }
    }.bind(this);

    renderError() {
        if (this.state.error) {
            return <InputGroup type="hint" value={this.state.error} />;
        }
    }

    render() {
        return (
            <div className="content" style={{maxWidth: '560px'}}>
                <Window>
                    <div className="hello">Добро пожаловать</div>
                    <Form onSubmit={this.attemptLogin}>
                        <InputGroup label="Логин" name="name" type="text" />
                        <InputGroup label="Пароль" name="password" type="password" />
                        <InputGroup type="submit" value="Войти" />
                        {this.renderError()}
                    </Form>
                </Window>
                <FooterDownload />
            </div>
        );
    }
}
