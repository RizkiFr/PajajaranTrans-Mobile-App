import React from 'react'
import { WebView } from 'react-native'

export default class Tentang extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return{
            title: navigation.getParam('title'),
            headerStyle:{
                backgroundColor: '#5cb85c'
            },
            headerTintColor: '#fff'
        }
    }

    constructor(props){
        super(props),
        this.state={
            url: props.navigation.getParam('url')
        }
    }
    render(){
        return(
            <WebView
                source={{uri: this.state.url}}
            />
        )
    }
}