import React from 'react';
import { Item, Form, Card, CardItem,  Body, Content, Picker, Spinner } from 'native-base';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import { Font } from "expo";
import Slideshow from 'react-native-image-slider-show';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';

export default class Home extends React.Component {
    static navigationOptions = {
        title: "Pajajaran Trans",
        headerStyle:{
            backgroundColor: '#5cb85c'
        },
        headerTintColor: '#fff',
    }

    constructor(props){
        super(props),
        this.state={
            dataSource:[],
            position: 0,
            interval: null,
            date: null,
            cari:{
                kotaAsal:null,
                kotaTujuan:null,
                tgl: null,
                jumlah:null,
            },
            perjalanan:null,
            loading: true
        }
    }
    

    pilihKotaAsal(value) {
        let cari = Object.assign({}, this.state.cari);
        cari.kotaAsal = value;
        this.setState({cari});
      }
    setDate(newDate) {
        let cari = Object.assign({}, this.state.cari);
        cari.tgl = newDate;
        this.setState({cari});
      }

    pilihKotaTujuan(value) {
        let cari = Object.assign({}, this.state.cari);
        cari.kotaTujuan = value;
        this.setState({cari});
      }
    pilihJumlah(value) {
        let cari = Object.assign({}, this.state.cari);
        cari.jumlah = value;
        this.setState({cari});
      }
    async componentDidMount(){
        axios.get('http://domain.com/public/api/auth/user')
          .then(res=>{
              AsyncStorage.setItem('profile', JSON.stringify(res.data))
          })
        axios.get('https://domain.com/public/api/auth/slider')
            .then(res =>{
                this.setState({dataSource: res.data.data})
            })
        this.setState({ loading: false });
    }
    componentWillMount() {
        this.setState({
          interval: setInterval(() => {
            this.setState({
              position: this.state.position === this.state.dataSource.length-1 ? 0 : this.state.position + 1
            });
          }, 5000)
        });
      }     
      componentWillUnmount() {
        clearInterval(this.state.interval);
      }

  render() {
        if (this.state.loading) {
            return (
                <Spinner style={styles.loading} />
            );
        }
        return(
            <Content style={styles.container}>
                <Card>
                    <Slideshow
                        arrowSize={0}
                        dataSource={this.state.dataSource}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({ position })}
                        />
                </Card>
                <Form>
                    <Card>
                        <CardItem style={{flexDirection: 'column', alignItems: 'stretch'}}>
                        <Body style={styles.input}>
                            <Item>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Pilih Kota Asal"
                                    placeholderIconColor="#007aff"
                                    placeholderStyle={{ color: "#d3d3d3" }}
                                    selectedValue={this.state.cari.kotaAsal}
                                    onValueChange={this.pilihKotaAsal.bind(this)}
                                    >
                                    <Picker.Item label="Bandung" value="Bandung" />
                                    <Picker.Item label="Bogor" value="Bogor" />
                                </Picker>
                            </Item>
                            <Item>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Pilih Kota Tujuan"
                                    placeholderStyle={{ color: "#d3d3d3" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.cari.kotaTujuan}
                                    onValueChange={this.pilihKotaTujuan.bind(this)}
                                    >
                                    <Picker.Item label="Bandung" value="Bandung" />
                                    <Picker.Item label="Bogor" value="Bogor" />
                                </Picker>
                            </Item>
                            <Item>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Jumlah Penumpang"
                                    placeholderStyle={{ color: "#d3d3d3" }}
                                    selectedValue={this.state.cari.jumlah}
                                    onValueChange={this.pilihJumlah.bind(this)}
                                    >
                                    <Picker.Item label="1 Penumpang" value="1" />
                                    <Picker.Item label="2 Penumpang" value="2" />
                                    <Picker.Item label="3 Penumpang" value="3" />
                                    <Picker.Item label="4 Penumpang" value="4" />
                                    <Picker.Item label="5 Penumpang" value="5" />
                                </Picker>
                            </Item>
                            <Item style={styles.date}>
                                <DatePicker
                                    locale='id'
                                    style={{width:'90%'}}
                                    date={this.state.cari.tgl}
                                    mode="date"
                                    placeholder="Pilih Tanggal Berangkat"
                                    format="dddd, DD MMMM YYYY"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={{
                                    dateInput: {
                                        borderWidth: 0,
                                        alignItems: 'flex-start',
                                        paddingLeft: 11,
                                        
                                        
                                    }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={this.setDate.bind(this)}
                                />
                            </Item>
                        </Body>
                        <Button
                            title="Cari"
                            buttonStyle={{backgroundColor: '#5cb85c'}}
                            style={{marginTop: 20}}
                            disabled={this.state.cari.kotaAsal == null || this.state.cari.kotaTujuan == null || this.state.cari.tgl == null || this.state.cari.jumlah == null}
                            onPress={()=>this.props.navigation.navigate('Perjalanan', {cari: this.state.cari})} />
                    </CardItem>
                </Card>
            </Form>
        </Content>
    )
  }
}
  
const styles = StyleSheet.create({
    container:{
      flex :1,
      paddingHorizontal: 5
    },
    input:{
        
    },
    loading:{
        flex: 1,
        justifyContent: 'center'
    },
    date:{
        alignSelf: 'flex-start',
        paddingLeft: 5,
        marginBottom: 10,
        alignSelf: 'stretch',
        paddingVertical: 3
    }
  })