import React from 'react'
import { Text, View, ScrollView, AsyncStorage, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail, Icon, Card, CardItem, Button } from 'native-base'
import Axios from 'axios';

export default class Profile extends React.Component{
    static navigationOptions={
        title: 'Profile',
        headerStyle:{
            backgroundColor: '#5cb85c'
        },
        headerTintColor: '#fff'
    }

    constructor(props){
        super(props),
        this.state={
            profile: [],
            refreshing: false,
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        AsyncStorage.getItem('profile')
        .then(val=>{
            this.setState({profile: JSON.parse(val)})
            this.setState({refreshing: false});
        })
      }

    logOut = () =>{
        Alert.alert(
            'Yakin ingin keluar?',
            '',[
            {
                text: 'Batal',
                type: 'cancel'
            },
            {
                text: 'Keluar',
                onPress: ()=>{AsyncStorage.clear()
                    this.props.navigation.navigate('AuthLoading')
                    }
            }]
        )
    }

    componentDidMount(){
        AsyncStorage.getItem('profile')
        .then(val=>{
            this.setState({profile: JSON.parse(val)})
        })
    }

    render(){
        return(
            <ScrollView
                style={{paddingHorizontal: 5}}
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    />
              } >
                <Card>
                    <CardItem avatar>
                        <Left style={{flex:1}}>
                            <Thumbnail large source={{uri:'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png'}} />
                        </Left>
                        <Body style={{flex:2, justifyContent: 'center'}}>
                            <Text style={{fontSize: 18}}>{this.state.profile.name}</Text>
                            <Text style={{fontSize: 16}}>{this.state.profile.no_telp}</Text>
                            <Text style={{fontSize: 14}}>{this.state.profile.email}</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <ListItem icon onPress={()=> this.props.navigation.navigate('Tentang', {url: 'https://facebook.com', title: 'Tentang Pajajaran Trans'})}>
                        <Left>
                            <Button>
                                <Icon name="question" type="FontAwesome" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{fontSize: 16}}>Pusat Bantuan</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{backgroundColor: '#4C9FFF'}}>
                                <Icon name="ios-document" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{fontSize: 16}}>Syarat &amp; Ketentuan</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{backgroundColor: '#FFC231'}}>
                                <Icon name="key" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{fontSize: 16}}>Kebijakan Privasi</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon noBorder>
                        <Left>
                            <Button style={{backgroundColor: '#4AD85E'}} >
                                <Icon name="info" type="FontAwesome" />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{fontSize: 16}}>Tentang Pajajaran Trans</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </Card>
                <Card>
                    <ListItem icon noBorder onPress={this.logOut}>
                        <Left>
                            <Button style={{backgroundColor: '#FF3B2F'}}>
                                <Icon name="power"/>
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{fontSize: 16}}>Keluar</Text>
                        </Body>
                    </ListItem>
                </Card>
            </ScrollView>
        )
    }
}