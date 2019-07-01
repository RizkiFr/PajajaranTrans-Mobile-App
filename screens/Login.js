import React from 'react';
import { ScrollView, View, Text, Image, AsyncStorage } from 'react-native';
import { Card, CardItem, Body, Form, Item, Label, Input } from 'native-base';
import { Button, CheckBox } from 'react-native-elements';
import axios from 'axios';

export default class Login extends React.Component{
    constructor(props){
        super(props),
        this.state={
            auth: {
                email: null,
                password: null,
                remember_me: true
            },
            loading: false,
            error: null
        }
    }

    setEmail(email){
        let auth = Object.assign({}, this.state.auth)
        auth.email = email
        this.setState({auth})
    }
    setPass(pass){
        let auth = Object.assign({}, this.state.auth)
        auth.password = pass
        this.setState({auth})
    }
    remember=()=>{
        let auth = Object.assign({}, this.state.auth)
        auth.remember_me = !auth.remember_me
        this.setState({auth})
    }
    login=()=>{
        this.setState({loading: true, error: null})
        axios.post('http://domain.com/public/api/auth/login', this.state.auth)
        .then(res=>{
            AsyncStorage.setItem('access_token', res.data.access_token)
            this.setState({loading: false})
            this.props.navigation.navigate('bottomNavigator')
        })
        .catch(err =>{
            this.setState({loading: false})
            this.setState({error: 'Email atau Password salah atau belum terdaftar.'})
        })

    }
    render(){
        return(
            <ScrollView style={{paddingHorizontal: 10, paddingVertical: 50}}>
                <Form>
                    <Card>
                        <CardItem style={{flexDirection: 'column', alignItems: 'stretch'}}>
                            <Body>
                                <Image source={require('../assets/logo.png')} style={{alignSelf: 'center', width: 250, height: 250}} />
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        onChangeText={this.setEmail.bind(this)}
                                        value={this.state.auth.email} />
                                </Item>
                                <Item floatingLabel style={{marginTop: 10}}>
                                    <Label>Password</Label>
                                    <Input
                                        secureTextEntry
                                        onChangeText={this.setPass.bind(this)}
                                        value={this.state.auth.password} />
                                </Item>
                                {
                                    this.state.error = null? null : <Text style={{color: 'red'}}>{this.state.error}</Text>
                                }
                                <CheckBox
                                    title="Remember Me"
                                    checked={this.state.auth.remember_me}
                                    onPress={this.remember}
                                    containerStyle={{ marginLeft:0, paddingLeft: 0, borderWidth: 0, backgroundColor: 'transparent'}} />
                            </Body>
                                <Button
                                    disabled={this.state.auth.email == null || this.state.auth.password == null}
                                    loading={this.state.loading}
                                    title="Login"
                                    buttonStyle={{backgroundColor: '#5cb85c'}}
                                    style={{marginTop: 20}}
                                    onPress={this.login} />
                        </CardItem>
                    </Card>
                </Form>
            </ScrollView>
        )
    }
}