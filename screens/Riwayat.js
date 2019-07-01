import React from 'react';
import { ScrollView, View, Text, AsyncStorage, StyleSheet, RefreshControl } from 'react-native';
import { Card, CardItem } from 'native-base';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'

export default class Riwayat extends React.Component{
    static navigationOptions={
        title: 'Riwayat Order',
        headerStyle:{
            backgroundColor: '#5cb85c'
        },
        headerTintColor: '#fff'
    }
    constructor(props){
        super(props),
        this.state={
            riwayat: [],
            refreshing: false
        }
    }
    _onRefresh = () => {
        this.getRiwayat()
      }

    getRiwayat(){
        this.setState({refreshing: true});
        AsyncStorage.getItem('profile').then(val=>{
            const id = JSON.parse(val)
            axios.get('http://domain.com/public/api/auth/penumpang/'+id.id)
            .then(res=>{
                this.setState({riwayat: res.data.data})
                this.setState({refreshing: false});
            }).catch(err=>{
                console.debug(err.data)
            })
        })
    }
    componentDidMount(){
        this.getRiwayat()
        
    }
    render(){
        return(
            <ScrollView style={styles.card}
                    refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                        />
                    }>

                {
                    this.state.riwayat.map((data, id)=>
                    <Card key={id}>
                        <CardItem button onPress={()=> this.props.navigation.navigate('LocationTest', {token: data.snap_token})}>
                            <View style={styles.text}>
                                <Text style={styles.jam}>{moment(data.tanggal, 'YYYY-MM-DD').locale('id').format('DD MMMM YYYY')}</Text>
                                <Text style={styles.mobil}>{moment(data.jam, 'hh:mm:ss').format('HH:MM')} WIB</Text>
                            </View>
                            <View style={styles.textRight}>
                                <Text style={styles.harga}>{data.kota_asal} - {data.kota_tujuan}</Text>
                                <Text style={styles.kursi}>{data.status}</Text>
                            </View>
                        </CardItem>
                    </Card>
                    )
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        flex: 1,
        paddingHorizontal: 5
    },
    text:{
        flex: 1
    },
    textRight:{
        flex: 2,
        alignItems: 'flex-end'
    },
    jam:{
        fontSize: 16,
        color: '#5cb85c'
    },
    mobil: {
        fontSize: 12
    },
    harga:{
        fontSize: 16,
        color: '#FF5722'
    },
    kursi:{
        fontSize: 14,
    },
})