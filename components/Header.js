import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Font, AppLoading } from "expo";
import {StatusBar} from 'react-native'

export default class HeaderComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
          return (
              <AppLoading />
          );
        }
        return (
          <>
            <StatusBar barStyle = "dark-content" hidden = {true} backgroundColor = "#00BCD4" translucent = {true}/>
            <Header style={{ backgroundColor: '#5cb85c' }}>
            {this.props.back ?
              <Left>
                <Button transparent>
                 <Icon name='arrow-back'/>
                </Button>
              </Left>
              : null }
              <Body>
                <Title>{this.props.title}</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='more'/>
                </Button>
              </Right>
            </Header>
          </>
        );
      }
}