import React, { Component } from 'react';
import api from '../services/api';
import swal from 'sweetalert';

import twitterLogo from '../twitter.svg'
import './Register.css'

export default class Register extends Component {
    state = {
        name: '',
        email: '',
        username: '',
        password: ''
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, username, password} = this.state;
        let dataToSend = {
            userData : {
                name,
                email,
                username,
                password
            }
        }    
        
        if(!name.length) return;
        if(!email.length) return;
        if(!username.length) return;
        if(!password.length) return;


        await api.post('user/register', dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res => {
                if(res.data.sucess){
                    swal("Usuário registrado com sucesso",{
                        buttons: false,
                        timer: 1500
                      }).then((result) => {
                            this.props.history.push('/')
                      });
                }
            });
    };

    handleLogin = (e) => {
        this.props.history.push('/')
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    handleUserChange = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    handlePassChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };


  render() {
    return (
        <div className="register-wrapper">
            <img src={twitterLogo} alt="Twitter"/>
            <form onSubmit={this.handleSubmit}>
                <input
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    placeholder="Nome completo"
                />
                <input
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder="E-mail"
                    type="email"
                />
                <input
                    value={this.state.username}
                    onChange={this.handleUserChange}
                    placeholder="Nome de usuário"
                />
                <input
                    placeholder="Senha"
                    type="password"
                />
                <input
                    value={this.state.password}
                    onChange={this.handlePassChange}
                    placeholder="Confirme a senha"
                    type="password"
                />
                <button  type="submit">Registrar</button>
                <button onClick={this.handleLogin} className="subscribe" type="submit">Login</button>
            </form>
        </div>
    );
  }
}
