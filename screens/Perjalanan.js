import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Spinner, Icon } from 'native-base';
import moment from 'moment'
import axios from 'axios';

export default class Perjalanan extends React.Component{
    static navigationOptions = {
        title: "Perjalanan",
        headerStyle:{
            backgroundColor: '#5cb85c'
        },
        headerTintColor: '#fff'
    }
    constructor(props){
        super(props),
        this.state={
            data: undefined,
            loading: true,
            cari: props.navigation.getParam('cari')
        }
    }
    componentDidMount(){
        const tgl = moment(this.state.cari.tgl, 'dddd DD MMMM YYYY').format('YYYY-MM-DD');
            axios.get('https://domain.com/public/api/auth/perjalanan?tanggal='+tgl+'&kota_asal='+this.state.cari.kotaAsal+'&kota_tujuan='+this.state.cari.kotaTujuan+'&jumlahPenumpang='+this.state.cari.jumlah)
            .then(res =>{
                const data = res.data.data;
                this.setState({data, loading: false});
        })
        
    }

    render(){

        if(this.state.loading) {
            return(
                <>
                    <CardItem>
                        <View style={styles.text}>
                            <Text style={styles.kota}>{this.state.cari.kotaAsal} <Icon type='MaterialIcons' name='arrow-forward' style={{fontSize: 18}} /> {this.state.cari.kotaTujuan}</Text>
                            <Text style={styles.kursi}>{this.state.cari.tgl}</Text>
                        </View>
                    </CardItem>
                <View style={styles.loading}>
                    <Spinner/>
                </View>
                </>
            )
        } 
        return(
            <>
                <CardItem>
                    <View style={styles.text}>
                        <Text style={styles.kota}>{this.state.cari.kotaAsal} <Icon type='MaterialIcons' name='arrow-forward' style={{fontSize: 18}} /> {this.state.cari.kotaTujuan}</Text>
                        <Text style={styles.kursi}>{this.state.cari.tgl}</Text>
                    </View>
                </CardItem>
            <ScrollView style={styles.card}>

                {
                    this.state.data.map((data, id)=>
                    <Card key={id}>
                        <CardItem button onPress={()=> this.props.navigation.navigate('Seat', {id: data.id, jumlah: this.state.cari.jumlah})}>
                            <View style={styles.text}>
                                <Text style={styles.jam}>{moment(data.jam, 'hh:mm:ss').format('HH:MM')} WIB</Text>
                                <Text style={styles.mobil}>{data.jenis_mobil}</Text>
                            </View>
                            <View style={styles.textRight}>
                                <Text style={styles.harga}>Rp. {data.harga_tiket}</Text>
                                <Text style={styles.kursi}>Tersedia {5 - data.jumlahPenumpang} Kursi</Text>
                            </View>
                        </CardItem>
                    </Card>
                    )
                }
            </ScrollView>
            </>
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
        flex: 1,
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
    kota:{
        fontSize: 20
    },
    loading:{
        flex: 1,
        justifyContent: 'center'
    }
})