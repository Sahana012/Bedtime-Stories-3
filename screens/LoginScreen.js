import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(){
    super()
    this.state={
      email : "",
      password : ""
    }
  }

  showAlert(errorCode){
    switch(errorCode){
      case 'auth/user-not-found':
        alert('User Not Found')
        this.setState({
          email:"",
          password : ""
        })
        break
      case 'auth/invalid-email':
        alert('Invalid User')
        this.setState({
          password : ""
        })
        break
      default:
        this.setState({
          email:"",
          password : ""
        })
        alert('Invalid email and password')
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.container1}>
          <Text style={styles.title}>Bedtime Stories</Text>
          <TextInput
              placeholder="Enter the e-mail"
              placeholderTextColor = "black"
              onChangeText= {(emailText)=>{
                  this.setState({
                      email: emailText
                  })
              }}
              value={this.state.email}
              style={styles.textInput}
              />
          <TextInput
              placeholder="Enter the password"
              placeholderTextColor = "red"
              onChangeText= {(passwordText)=>{
                  this.setState({
                      password: passwordText
                  })
              }}
              value={this.state.password}
              style={styles.textInput}
              secureTextEntry = {true}
              />
        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.button}
            onPress = {async()=>{
              var email  = await this.state.email;
              var password = await this.state.password
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#abe6ff',
    flex: 1,
  },
  title:{
    fontSize:30,
    color:'pink',
    fontFamily: 'arial black',
    marginTop: -5
  },
  image:{
    margin:20,
    borderWidth:5,
    borderColor:'pink',
    borderRadius:20
  },
  container1:{
    justifyContent:'center',
    alignItems:'center',
    margin: 20,
    marginBottom: -10
  },
  container2:{
    alignItems:'center',
    margin: 10 
  },
  textInput : {
    width: '40%',
    height: 30,
    backgroundColor: 'pink',
    fontFamily: 'britannic',
    border: 'dashed',
    borderColor: 'black',
    padding: 17,
    marginLeft: 20,
    marginTop: 10,
    padding: 30,
    color: 'black',
    fontSize: 15,
    borderRadius: 80,
  },
  button:{
    width:90,
    height:90,
    backgroundColor: 'pink',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 3,
    borderColor:'black',
    borderRadius: 100,
    marginTop: 1 
  },
  buttonText:{
    color:'white',
    fontSize:25,
    fontWeight: 'bold'
  }
})