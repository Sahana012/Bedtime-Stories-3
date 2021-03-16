import React from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config'




export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
      this.state = {
        search: '',
        allStories: [],
        dataSource: [],
      }
    }

    componentDidMount(){
      this.retrieveStories()
    }

    updateSearch = (search) => {
      this.setState({ search });
    };
  
    retrieveStories=()=>{
      try {
        var allStories= []
        var stories = db.collection("books")
          .get().then((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
                
                allStories.push(doc.data())
                console.log('this are the stories',allStories)
            })
            this.setState({allStories})
          })
      }
      catch (error) {
        console.log(error);
      }
    }
    SearchFilterFunction(text) {
      const newData = this.state.allStories.filter((item)=> {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      this.setState({
        dataSource: newData,
        search: text,
      });
    }


  render() {
    const { search } = this.state;
    return (
          <KeyboardAvoidingView style={styles.allText}>
          <TouchableOpacity style={styles.header}>
            <Text style={styles.headerText}>Story Hub App</Text>
          </TouchableOpacity>
          <SearchBar
          placeholder="Type Here..."
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          style = {{ backgroundColor: 'pink', border: 'dashed', borderColor: 'black', color: 'black'}}
          value={search}
        />
          <FlatList
            data={this.state.allStories}
            renderItem={({ item }) => (
              <View key={db.collection("books")} style={{borderBottomWidth: 2}}>
              <Text>{"Title: " + item.title }</Text>
              <Text>{"Author: " + item.author }</Text>
            </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
  allText: {
    backgroundColor: '#abe6ff',
    flex: 1,
    fontFamily: 'britannic',
  },
  header: {
    backgroundColor: 'pink',
    border: 'dashed',
  },
  headerText: {
    fontFamily: 'britannic',
    fontSize: 35,
    textAlign: 'center',
    padding: 5,
  },
  displayText: {
    fontFamily: 'britannic',
    fontSize: 19,
    padding: 15,
  },
});