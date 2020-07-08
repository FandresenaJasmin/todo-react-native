import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderTodo extends Component {
  render() {
    return (
        <Header style={{backgroundColor : '#222'}}>
          <Left>
          </Left>
          <Body>
            <Title>Todos App</Title>
          </Body>
          <Right>
          </Right>
        </Header>
    );
  }
}