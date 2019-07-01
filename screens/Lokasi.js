import React from 'react'
import { Text, StyleSheet,  Button, Modal } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
import { Form, Item, Label, Input} from 'native-base'

export default class Lokasi extends React.Component{
    constructor(props){
        super(props)
        this.state={
            alamat: null,
            latitude: null,
            longitude: null,
            modal: false

        }
    }

    onRegionChange(details) {
        const alamat = details.formatted_address;
        const latitude = details.geometry.location.lat; 
        const longitude = details.geometry.location.lng; 
        this.setState({alamat, latitude, longitude});
     }

    render(){
        return(
            <ScrollView>
                <Form>
                    <Item floatingLabel>
                    <Label>Username</Label>
                    <Input 
                        onFocus={()=>this.setState({modal: !this.state.modal})}
                        value={this.state.alamat} />
                    </Item>
                    <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input />
                    </Item>
                </Form>
                <Button title="modal" onPress={()=>this.setState({modal: !this.state.modal})} />
                <Button title="cek" onPress={()=> console.debug(this.state.alamat, this.state.latitude, this.state.longitude)} />
              <Modal visible={this.state.modal} animationType="slide">
                <GooglePlacesAutocomplete
                    style="height: 70)"
                    placeholder='Cari lokasi'
                    minLength={3}
                    autoFocus={true}
                    fetchDetails
                    listViewDisplayed='auto'
                    query={{
                        key: 'YOUR_API_KEY',
                        language: 'id',
                        types: 'geocode',
                    }}
                    currentLocation={true}
                    currentLocationLabel="Lokasi saat ini"
                    nearbyPlacesAPI='GooglePlacesSearch'
                    onPress={(data, details) => {
                        this.setState({
                            alamat: details.formatted_address,
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng})
                        this.setState({modal: !this.state.modal})
                    }} />
                    <Button title="Close" onPress={()=>this.setState({modal: !this.state.modal})} />
              </Modal>
            </ScrollView>
        )
    }
}
