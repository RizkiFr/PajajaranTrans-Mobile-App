import React from 'react';
import { ScrollView, View, StyleSheet, AsyncStorage, Alert, Modal, Text } from 'react-native'
import { Item, Label, Input, Form, Card, CardItem, Body, Right } from 'native-base';
import { Button } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

export default class Pesan extends React.Component{
    static navigationOptions={
        title: 'Detail Pesanan',
        headerStyle:{
            backgroundColor: '#5cb85c'
        },
        headerTintColor: '#fff'
    }
    constructor(props){
        super(props)
        this.state={
            pemesans: {
                perjalanan_id: props.navigation.getParam('id'),
                no_kursi: props.navigation.getParam('seats'),
                nama: null,
                no_telp: null,
                email: null,
                layanan:'door to door',
                tambahan:null,
                alamat_jemput:null,
                alamat_antar:null,
                latitude_antar:null,
                longitude_antar: null,
                latitude_jemput: null,
                longitude_jemput: null,
                user_id: null,
                total_harga: null
            },
            tiket: this.props.navigation.getParam('harga_tiket'),
            text: null,
            loading: false,
            modalJemput: false,
            modalAntar: false
        }
    }
    pesanTiket=()=>{
        this.setState({loading: !this.state.loading})
        axios.post('https://domain.com/public/api/auth/order',this.state.pemesans)
        .then(res=>{
            console.log(res.data.snapToken)
            Alert.alert(
                'Sukses',
                'Tiket berhasil di pesan, silahkan lakukan pembayaran',[
                {
                    text: 'Ok',
                    onPress: ()=>{ this.props.navigation.navigate('LocationTest',{token: res.data.snapToken})}
                }]
            )
            this.setState({loading: !this.state.loading})
        }).catch(err=>{
            Alert.alert(
                'Gagal',
                'Toket gagal di pesan',[
                {
                    text: 'Ok'
                }]
            )
            this.setState({loading: !this.state.loading})
        })
    }
    setAlamatJemput(details){
        const pemesans = Object.assign({}, this.state.pemesans)
        pemesans.alamat_jemput = details.formatted_address,
        pemesans.latitude_jemput = details.geometry.location.lat,
        pemesans.longitude_jemput = details.geometry.location.lng
        this.setState({pemesans, modalJemput: !this.state.modalJemput})
    }
    setAlamatAntar(details){
        const pemesans = Object.assign({}, this.state.pemesans)
        pemesans.alamat_antar = details.formatted_address,
        pemesans.latitude_antar = details.geometry.location.lat,
        pemesans.longitude_antar = details.geometry.location.lng
        this.setState({pemesans, modalAntar: !this.state.modalAntar})
    }

    componentDidMount(){
        AsyncStorage.getItem('profile')
        .then(val=>{
            const pemesans = Object.assign({}, this.state.pemesans)
            const value = JSON.parse(val)
            pemesans.nama = value.name
            pemesans.no_telp = value.no_telp
            pemesans.email = value.email
            pemesans.user_id = value.id
            this.setState({pemesans})
            this._setTotal()
        })
    }
    _setTotal(){
        const pemesans = Object.assign({}, this.state.pemesans)
        pemesans.tambahan = this.state.pemesans.no_kursi.length*30000;
        pemesans.total_harga = this.state.pemesans.no_kursi.length*(30000+this.state.tiket);
        this.setState({pemesans})

    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Form>
                        <Card>
                            <CardItem style={{flexDirection: 'column', alignItems: 'stretch'}}>
                                <Body>
                                    <Item floatingLabel style={styles.input}>
                                        <Label >Nama Lengkap</Label>
                                        <Input onChangeText={(text)=>{
                                            let pemesans = Object.assign({}, this.state.pemesans);
                                            pemesans.nama = text;
                                            this.setState({pemesans})} }
                                            value={this.state.pemesans.nama} />
                                    </Item>
                                    <Item floatingLabel style={styles.input}>
                                        <Label >Nomor HP</Label>
                                        <Input keyboardType = 'numeric'
                                                onChangeText={(text)=>{
                                                let pemesans = Object.assign({}, this.state.pemesans);
                                                pemesans.no_telp = text;
                                                this.setState({pemesans})} }
                                                value={this.state.pemesans.no_telp} />
                                    </Item>
                                    <Item floatingLabel style={styles.input}>
                                        <Label >Email</Label>
                                        <Input keyboardType = 'email-address'
                                                onChangeText={(text)=>{
                                                let pemesans = Object.assign({}, this.state.pemesans);
                                                pemesans.email = text;
                                                this.setState({pemesans})} }
                                                value={this.state.pemesans.email} />
                                    </Item>
                                    <Item floatingLabel style={styles.input}>
                                        <Label >Alamat Jemput</Label>
                                        <Input onFocus={()=>this.setState({modalJemput: !this.state.modalJemput})} value={this.state.pemesans.alamat_jemput} />
                                    </Item>
                                    <Item floatingLabel style={styles.input}>
                                        <Label >Alamat Antar</Label>
                                        <Input onFocus={()=>this.setState({modalAntar: !this.state.modalAntar})} value={this.state.pemesans.alamat_antar} />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                    </Form>
                    <Card>
                        <CardItem>
                            <View style={{flex: 2}}>
                                <Text>Tiket</Text>
                                <Text>Surcharger</Text>
                                <Text>Total</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>: {this.state.pemesans.no_kursi.length} x Rp. {this.state.tiket}</Text>
                                <Text>: {this.state.pemesans.no_kursi.length} x Rp. 30000</Text>
                                <Text>: Rp. {this.state.pemesans.total_harga}</Text>
                            </View>
                        </CardItem>
                    </Card>
                        <Button loading={this.state.loading} onPress={this.pesanTiket} title="Pesan" buttonStyle={{backgroundColor: '#5cb85c'}} style={styles.input} />
                </View>
                <Modal visible={this.state.modalJemput} animationType="slide">
                    <GooglePlacesAutocomplete
                        style="height: 70)"
                        placeholder='Cari lokasi'
                        minLength={3}
                        autoFocus={true}
                        fetchDetails
                        listViewDisplayed='auto'
                        query={{
                            key: 'AIzaSyCKeMD8Ua7l6PqcRjPBsfBajzE9W3pyFuU',
                            language: 'id',
                            types: 'geocode',
                        }}
                        currentLocation={true}
                        currentLocationLabel="Lokasi saat ini"
                        nearbyPlacesAPI='GooglePlacesSearch'
                        onPress={(data, details) => {
                            this.setAlamatJemput(details)
                        }} />
                        <Button title="Close" onPress={()=>this.setState({modalJemput: !this.state.modalJemput})} />
                </Modal>
                <Modal visible={this.state.modalAntar} animationType="slide">
                    <GooglePlacesAutocomplete
                        style="height: 70)"
                        placeholder='Cari lokasi'
                        minLength={3}
                        autoFocus={true}
                        fetchDetails
                        listViewDisplayed='auto'
                        query={{
                            key: 'AIzaSyCKeMD8Ua7l6PqcRjPBsfBajzE9W3pyFuU',
                            language: 'id',
                            types: 'geocode',
                        }}
                        currentLocation={true}
                        currentLocationLabel="Lokasi saat ini"
                        nearbyPlacesAPI='GooglePlacesSearch'
                        onPress={(data, details) => {
                            this.setAlamatAntar(details)
                        }} />
                        <Button title="Close" onPress={()=>this.setState({modalAntar: !this.state.modalAntar})} />
                </Modal>
            </ScrollView>
        ) 
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 5
    },
    input:{
        marginTop: 10
    },
})