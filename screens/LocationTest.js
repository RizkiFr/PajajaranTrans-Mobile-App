import React from 'react';
import { View, WebView, StyleSheet, Button, ActivityIndicator } from 'react-native';

export default class LocationTest extends React.Component {

  constructor(props){
    super(props),
    this.state={
      loading: true
    }
  }

  render() {
    const token = this.props.navigation.getParam('token')
    let html = `
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript"
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key="SB-Mid-client-UjQzYZR1jkZ73Z-e"></script>
    <script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
    </head>
    <body>
    </body>
    `;
    let jsCode = `
              $(document).ready(function(){
                snap.pay("${token}",{
                  onSuccess:(result)=>{
                    alert('Pembayaran sukses')
                  },
                  onPending:(result)=>{
                    alert('Pembayaran sedang di proses')
                  },
                  onError:(result)=>{
                    alert('Pembayaran gagal')
                  },
                  onClose:()=>{
                    alert('Segera lakukan pembayaran')
                  }
                  });
              });
    `;
    return (
        <View style={styles.container}>
        {
          this.state.loading? <ActivityIndicator/> : <Button title="Selesai" onPress={()=>{this.props.navigation.navigate('Riwayat')}}/>
        }
            <WebView
                onLoadEnd={()=>this.setState({loading: false})}
                source={{html:html}}
                injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}
            >
            </WebView>
        </View>
    );
  }  
}

let styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  webView: {
      backgroundColor: '#fff',
      height: 350,
  }
  });