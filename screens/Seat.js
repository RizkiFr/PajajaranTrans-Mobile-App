import React from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { Spinner, Button, Text } from 'native-base';

export default class Seat extends React.Component{
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return{
            title: "Pilih Seat",
            headerStyle:{
                backgroundColor: '#5cb85c'
            },
            headerTintColor: '#fff'
        }
    }
    constructor(props){
        super(props),
        this.state={
            id: props.navigation.getParam('id'),
            seat1: false,
            seat2: false,
            seat3: false,
            seat4: false,
            seat5: false,
            seats: [],
            penumpang: props.navigation.getParam('jumlah'),
            perjalanan:{},
            loading: true
        }
    }
    handlePres1=()=>{
        const seat = this.state.seat1;
        seat? 
        this.setState({seats: this.state.seats.filter(item => item != '1' )}) : this.setState({seats: this.state.seats.concat('1')}); 
        this.setState({seat1: !this.state.seat1});
    }
    handlePres2=()=>{
        const seat = this.state.seat2;
        seat? 
        this.setState({seats: this.state.seats.filter(item => item != '2' )}) : this.setState({seats: this.state.seats.concat('2')}); 
        this.setState({seat2: !this.state.seat2});
    }
    handlePres3=()=>{
        const seat = this.state.seat3;
        seat? 
        this.setState({seats: this.state.seats.filter(item => item != '3' )}) : this.setState({seats: this.state.seats.concat('3')}); 
        this.setState({seat3: !this.state.seat3});
    }
    handlePres4=()=>{
        const seat = this.state.seat4;
        seat? 
        this.setState({seats: this.state.seats.filter(item => item != '4' )}) : this.setState({seats: this.state.seats.concat('4')}); 
        this.setState({seat4: !this.state.seat4});
    }
    handlePres5=()=>{
        const seat = this.state.seat5;
        seat? 
        this.setState({seats: this.state.seats.filter(item => item != '5' )}) : this.setState({seats: this.state.seats.concat('5')}); 
        this.setState({seat5: !this.state.seat5});
    }
    componentDidMount(){
        axios.get('https://domain.com/public/api/auth/perjalanan/'+this.state.id)
        .then(res => {
            const data = res.data.data[0];
            this.setState({perjalanan: data, loading: false});
        })
        this._setNavigatiosParams
    }
    _setNavigatiosParams(){
        let isDisabled = false
        let hendleNext = <Button disabled={this.props.navigation.getParam('isDisabled')} title="Selanjutnya" onPress={()=> this.props.navigation.navigate('Pesan', {seats: this.state.seats, id: this.state.id})} />;
        this.props.navigation.setParams({
            hendleNext,
            isDisabled
        });
    }
    
    render(){

        if(this.state.loading) {
            return(
                <View style={styles.loading}>
                    <Spinner/>
                </View>
            )
        } 
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.row}>
                {
                    this.state.perjalanan.no_kursi1 == 1?
                    <CheckBox
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatTerisi.png')} />}
                        checked={false}
                    /> :
                    <CheckBox
                    disabled={this.state.seats.length >= this.state.penumpang && this.state.seats.indexOf('1') === -1}
                    checkedIcon={<Image style={styles.seat} source={require('../assets/seatDipilih.png')} />}
                    uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatKosong.png')} />}
                    checked={this.state.seat1}
                    onPress={this.handlePres1}
                    />
                }
                    <CheckBox
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatDriver.png')} />}
                        checked={false}
                    />
                </View>
                <View style={styles.row}>
                {
                    this.state.perjalanan.no_kursi2 == 1?
                    <CheckBox
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatTerisi.png')} />}
                        checked={false}
                    /> :
                    <CheckBox
                        disabled={this.state.seats.length >= this.state.penumpang && this.state.seats.indexOf('2') === -1}
                        checkedIcon={<Image style={styles.seat} source={require('../assets/seatDipilih.png')} />}
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatKosong.png')} />}
                        checked={this.state.seat2}
                        onPress={this.handlePres2}
                    />
                }
                {
                    this.state.perjalanan.no_kursi3 == 1?
                    <CheckBox
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatTerisi.png')} />}
                        checked={false}
                    /> :
                    <CheckBox
                        disabled={this.state.seats.length >= this.state.penumpang && this.state.seats.indexOf('3') === -1}
                        checkedIcon={<Image style={styles.seat} source={require('../assets/seatDipilih.png')} />}
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatKosong.png')} />}
                        checked={this.state.seat3}
                        onPress={this.handlePres3}
                    />
                }
                </View>
                <View style={styles.row}>
                {
                    this.state.perjalanan.no_kursi4 == 1?
                    <CheckBox
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatTerisi.png')} />}
                        checked={false}
                    /> :
                    <CheckBox
                        disabled={this.state.seats.length >= this.state.penumpang && this.state.seats.indexOf('4') === -1}
                        checkedIcon={<Image style={styles.seat} source={require('../assets/seatDipilih.png')} />}
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatKosong.png')} />}
                        checked={this.state.seat4}
                        onPress={this.handlePres4}
                    />
                }
                {
                    this.state.perjalanan.no_kursi5 == 1?
                    <CheckBox
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatTerisi.png')} />}
                        checked={false}
                    /> :
                    <CheckBox
                        disabled={this.state.seats.length >= this.state.penumpang && this.state.seats.indexOf('5') === -1}
                        checkedIcon={<Image style={styles.seat} source={require('../assets/seatDipilih.png')} />}
                        uncheckedIcon={<Image style={styles.seat} source={require('../assets/seatKosong.png')} />}
                        checked={this.state.seat5}
                        onPress={this.handlePres5}
                    />
                }
                </View>
                    <Button
                        style={{marginHorizontal: 50, marginTop: 10}}
                        success
                        block
                        disabled={this.state.seats.length != this.state.penumpang}
                        onPress={()=> this.props.navigation.navigate('Pesan', {seats: this.state.seats, id: this.state.id, harga_tiket: this.state.perjalanan.harga_tiket})}>
                        <Text>Next</Text>
                    </Button>
            </View>
                
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    seat:{
        width: 80,
        height: 124,
        marginHorizontal: 10
    },
    row:{
        flexDirection: 'row',
    },
    container:{
        flex: 1,
        alignItems: 'center'
    },
    loading:{
        flex: 1,
        justifyContent: 'center'
    },
    button:{
        paddingHorizontal: 20
    },
    keterangan:{
        fontSize:18,
        marginTop: 20
    }
})