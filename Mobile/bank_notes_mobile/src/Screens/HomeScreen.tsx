
import React, {Component, type PropsWithChildren} from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList, Modal, StyleSheet } from 'react-native';
import Card from '../Components/Card';
import Fab from '../Components/Fab';
import SortModal from '../Components/SortModal';
import { NavigatorScreenParams } from '@react-navigation/native';
import _ from 'lodash';
import { NoteModel } from '../Models/NoteModel';
import NotesStore from '../Store/NotesStore';

interface Props{
    notesStore:NotesStore;
}

interface State {
    _ModalVisible: boolean;
    search:string;
    notes:NoteModel[];
  }

class HomeScreen extends Component<Props, State>{
    limitSearch: _.DebouncedFunc<(search: any) => void>;
    constructor(props:Props){
      super(props);
      this.limitSearch = _.debounce(this.searchData, 800);
      this.state = {
        _ModalVisible:false,
        search:'',
        notes: [],
      };
    }
  
    setModalVisibility = (bool:boolean) => {
      this.setState({ _ModalVisible: bool});
    }

    fetchData = () => {
        let {sort, search, selectedCategory} = this.props.notesStore.notes;
        this.props.notesStore.getNotes({sort, search, selectedCategory});
        this.props.notesStore.getCategories();
    }

    searchData = (search:string) =>{
        let {sort, selectedCategory} = this.props.notesStore.notes;
        this.props.notesStore.getNotes({sort, search, selectedCategory});
    }

    loadMore = () =>{
      let {sort, nextPage, search, selectedCategory} = this.props.notesStore.notes;
      this.props.notesStore.getMoreNotes({sort, search, nextPage, selectedCategory});
    }

    componentDidMount = () => {
        this.fetchData();
    }
    componentWillUnmount(){

    }
    _onRefresh = () => {
        let selectedCategory = "";
        let sort = "";
        let search = "";
        this.props.notesStore.getNotes({sort, search, selectedCategory});
        this.props.notesStore.getCategories();
    }
    _keyExtractor = (item:any, index:number) => item.id;
  
    render() {
      return (
        
        <View style={styles.container}>
          <View style={styles.search}>
              <TextInput style = {styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder = "Search..."
                placeholderTextColor = "#999"
                autoCapitalize = "none"
                onChangeText={(search) => this.limitSearch(search)}
              />  
          </View>
            {
              this.props.notesStore.notes.isLoading ?
                <ActivityIndicator style={styles.activityIndicator} size="large" color="#000" /> : 
                this.props.notesStore.notes.isError ? 
                  <Text>Error, please try again!</Text>
                  :(
                    <FlatList
                      style={styles.noteList}
                      data={this.props.notesStore.notes.data}
                      keyExtractor={this._keyExtractor}
                      numColumns={2}
                      onRefresh={this._onRefresh}
                      refreshing={this.props.notesStore.notes.isLoading}
                      renderItem={({item}) => <Card/>}
                      onEndReachedThreshold={0.1}
                      onEndReached={({ distanceFromEnd }) => {this.loadMore()}}
                    />
                  )
            }
          {/* <Fab navigation={this.props.navigation}/>
          <Modal transparent={true} visible={this.state._ModalVisible} onRequestClose={() => this.setModalVisibility(false)}>
            <SortModal setModalVisibility={this.setModalVisibility}/>
          </Modal> */}
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      paddingTop:0,
      justifyContent: 'center',
      backgroundColor: '#FAFEFF',
      alignItems:'center'
    },
    activityIndicator: {
      paddingTop: 300,
      position : 'absolute',
    },
    noteList: {
      marginTop: 70,
      paddingBottom:100
    },
    input: {
        marginHorizontal: 20,
        height: 37,
        borderColor: '#999',
        borderWidth: 0,
        color:'#999'
      },
      search: {
        padding:0,
        position:'absolute',
        marginTop:20,
        marginHorizontal:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 3,
        borderColor: '#999',
        borderWidth: 0,
        borderRadius:25,
        backgroundColor:'#FFF',
        opacity:0.9,
        width:304,
        top:0,
        zIndex:1
      }
  });

export default HomeScreen;
