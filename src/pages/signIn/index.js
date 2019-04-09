import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/adonis/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {

    static navigationOptions = {
        header: null,
    };

    state = { 
        email: '', 
        password: '', 
        error: '' 
    };

    static propTypes = {
        navigation: PropTypes.shape({
          navigate: PropTypes.func,
          dispatch: PropTypes.func,
        }).isRequired,
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };
      
    handleCreateAccountPress = () => {
        this.props.navigation.navigate('SignUp');
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
          this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
          try {
            const response = await api.post('/user/auth', {
              email: this.state.email,
              password: this.state.password,
            });
              
            await AsyncStorage.setItem('@Barro:token', response.data.token);
    
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          } catch (_err) {
            this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
          }
        }
      };

    render() {
        return (
        <Container>
            <StatusBar hidden />
            <Logo source={require('../../images/logo.png')} resizeMode="contain" />
            <Input
            placeholder="Endereço de e-mail"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <Input
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            />
            {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
            <Button onPress={this.handleSignInPress}>
            <ButtonText>Entrar</ButtonText>
            </Button>
            <SignUpLink onPress={this.handleCreateAccountPress}>
            <SignUpLinkText>Criar conta grátis</SignUpLinkText>
            </SignUpLink>
        </Container>
        );
    }
}