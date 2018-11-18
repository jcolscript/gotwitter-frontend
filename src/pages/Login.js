import React, { Component } from 'react';
import api from '../services/api';
import swal from 'sweetalert';

import twitterLogo from '../twitter.svg'
import './Login.css'

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        let dataToSend = {
            userData : {
                username: username,
                password: password
            }
        }    
        
        if(!username.length) return;
        if(!password.length) return;

        await api.post('auth/login', dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res => {
                if(res.data.success){
                    let GoTwitter = {
                        username: username,
                        token: res.data.token
                    }
                    localStorage.setItem('@GoTwitter', GoTwitter);
                    this.props.history.push('timeline');
                }
            })
            .catch(error => {
                const resData = error.response.data;
                if(!resData.success){
                    swal({
                        text: "Usuário ou senha invalido",
                        icon: "warning",
                      });
                }
                
            });

    };

    handleRegister = (e) => {
        this.props.history.push('user/register');
    }

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
        <div className="login-wrapper">
            <img src={twitterLogo} alt="Twitter"/>
            <form onSubmit={this.handleSubmit}>
                <input
                    value={this.state.username}
                    onChange={this.handleUserChange}
                    placeholder="Nome de usuário"
                />
                <input
                    value={this.state.password}
                    onChange={this.handlePassChange}
                    placeholder="Senha"
                    type="password"
                />
                <button type="submit">Entrar</button>
                <button onClick={this.handleRegister} className="subscribe">Inscrever-se</button>
                <a href="!#" className="subspan">Esqueci a senha</a>
            </form>
        </div>
    );
  }
}
