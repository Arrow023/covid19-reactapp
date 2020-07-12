import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,Linking,Alert,Image} from 'react-native';
import {SocialIcon,Card,Divider,Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      date:new Date()  //this will get the current date
    };
    this.fetcher=this.fetcher.bind(this);  // this will prevent the function from calling randomly
  }
  fetcher()
    {
      var string= this.state.date.toString();
      var date=new Date(string);
      var d=new Date("2020-06-01");
      var diff=((date.getTime()-d.getTime())/(1000 * 3600 * 24));
      diff=Math.ceil(diff);
      fetch('https://covid19predict.herokuapp.com/predict/'+diff)
      .then(response =>{
        
        if (response.ok)
            return response;
        else
        {
            var error =new Error('Error '+response.status+" :"+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response=>response.json())
    .then((prediction)=> {
      Alert.alert(
        'Result of Prediction',
        'Predicted: '+prediction.prediction,
        [
            {
                text:'OK',
                onPress:()=>{
                    console.log('Okay button pressed');
                }
            }
        ],
    );
      
    }
    )
    .catch((err)=>console.log(err));
    }

  render(){

    return (
      <ScrollView>
        {/* This is first view */}
        <View style={styles.jumbotron}>    {/*single curly braces means you are going to use react elements*/}
          <Text style={{color:'#fff',fontSize:35}}>COVID-19 Predictor</Text> {/*double curly braces means you are going to use JS elements*/}
          <Text style={{color:'#fff',fontSize:20,padding:10}}>This application can predict total count of covid-19 positive cases for a given date.</Text>
        </View>
        {/* This is second view */}
        <View style={styles.second}>
          <Text style={{fontSize:18}} >
            We the team of Life Lessons have provided a little support in predicting COVID-19 cases.</Text>
            <Divider style={{ backgroundColor: 'red',height:2 }} />  {/*This draws a line red line. Its similar to a horizontal rule in webpage */}
          <Text style={{color:'#191f96'}}>    We all know we are suffering from the deadly covid-19 disease.Many people have lost their lives. 
            Still some people doesn't care about these disease. 
            That's when we thought of building covid-19 predictor to tell everyone about the deadly disease.
             We've noticed many people ignoring this epidemic and travelling without a second thought. 
             When someone gets stucked by the disease they feel depressed as why couldn't they be careful then.
              In keeping this mind, we have decided to design a site that predicts future disease widespread and 
              hoping that it will create impact on the people. Even if its in small measure, we are happy.
               If you like our small effort, feel free to take a look at your YouTube page</Text>
               <SocialIcon button type='youtube' onPress={()=>Linking.openURL('https://www.youtube.com/c/Lifelessons2327')}/>
        </View>
        {/* This is a card view  */}
        <Card style={{padding:10,alignItems:'center'}} image={require('./logo.jpg')} imageStyle={{width:400,height:400}}  >
          <Text style={{color:'#e0081a',fontSize:16}}>Enter the date you wish to check the total cases</Text>
          <DatePicker   
            style={{flex:1,width:250,padding:10}}  date={this.state.date}  
            format='YYYY-MM-DD' mode='date' minDate='2020-07-08' 
            confirmBtnText='Confirm' cancelBtnText='Cancel'
            customStyles={{  
                dateIcon:{
                    position:'absolute',
                    left:2,
                    top:4,
                    marginLeft:0
                },
                dateInput:{
                    marginLeft:36,
                }
            }}
            onDateChange={(date)=>{this.setState({date:date})}}   
            />
        <Button title='Submit' type='outline' onPress={this.fetcher}/>    
        </Card>
        {/* This is the third view */}
        <View style={styles.last}>
            <Text style={{color:'#191f96'}}> Thanks for visiting our website.Also dont forget to subscribe our youtube channel.</Text>
        </View>
        {/* This is the fourth view. A quote section*/}
        <View style={{alignItems:'center'}}>
          <Text style={{color:'#fc8e07',fontSize:19}}>PLEASE BE SAFE</Text>
          <Text style={{color:'#fc8e07',fontSize:19}}>STAY HOME STAY SAFE!</Text>
        </View>
        {/* This is the final view, basically a footer section of a webpage */}
        <View style={{flex:1,flexDirection:"row",justifyContent:'center'}} >
          <SocialIcon button type='facebook' style={{width:50}} onPress={()=>Linking.openURL('https://www.facebook.com/lifelessons2327')} />
          <SocialIcon button type='instagram' style={{width:50}} iconColor='#E1306C' onPress={()=>Linking.openURL('https://www.instagram.com/lifelessons__2327/')} />
          <SocialIcon button type='youtube' style={{width:50}} onPress={()=>Linking.openURL('https://www.youtube.com/c/Lifelessons2327')} />
          <SocialIcon button type='envelope' style={{width:50}} onPress={()=>Linking.openURL('mailto:oliverqueen232000@gmail.com')} />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }
  
}


// This is where all the styles are defined. 
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jumbotron:{
    flex:1,
    padding:25  ,
    flexDirection:'column', 
    width:Dimensions.get('window').window, 
    height:200,backgroundColor:'#343A40',
    alignItems:'center',
    borderWidth:2,
    borderColor:'#fff'
  },
  second:{
    fontSize:16,
    padding:15,
    backgroundColor:'#d7d7dd',
    borderWidth:2,
    borderColor:'#fff'
  },
  last:{
    padding:12
  }
});


// This is the ultimate important step. If you don't have this line, then your app will never work. 
export default App;