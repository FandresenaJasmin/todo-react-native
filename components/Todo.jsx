import React , { Component } from 'react'
import { Container ,Text, Form, Item, Input, Button, Icon, List, Card, CardItem, Right} from 'native-base';
import { NativeEventEmitter ,ListView,StyleSheet ,View, TouchableOpacity, TouchableHighlight} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view'
var id = 1
class Todo extends Component {
    constructor(props){
        super(props)
        this.addTodo = this.addTodo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.closeRow = this.closeRow.bind(this)
        this.closeAllOpenRows = this.closeAllOpenRows.bind(this)
        this.openRowRefs = []
    }
    state = {
        todoDescription : "",
        editMode : false,
        id_edit : 0,
        todo : [
           {
               key :id,
               description : "first todo"
           }
        ]
    }
     addTodo = ()=>{
         id++
         if(this.state.todoDescription != ""){
            if(!this.state.editMode){
                this.setState({
                    todo : [...this.state.todo,{key:id,description : this.state.todoDescription}]
                })
             }else{
                 this.ediTodo({key : this.state.id_edit,description:this.state.todoDescription})
             }
             this.setState({todoDescription :""})
         }else{
             alert("please fill the form !")
         }
    }
    ediTodo = (todo)=>{
        let t = this.state.todo.map((tod)=>{
            if(tod.key == todo.key){
                tod.description = todo.description
            }
            return tod
        })
        this.setState({
            todo : t,
            editMode : false
        })
    }
    deleteTodo = (id)=>{
        let t = this.state.todo.filter((tt)=>tt.key!=id)
        this.setState({
            todo : t
        })
    }
    handleChange = (e)=>{
       let val = e.nativeEvent.text
        this.setState({todoDescription:val})
    }
     closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
        console.log([rowKey])
    };
    onRowDidOpen = (rowKey, rowMap) => {
        this.openRowRefs.push(rowMap[rowKey]);
    }
    closeAllOpenRows() {
        if(this.state.todo.length>0 && this.openRowRefs.length>0){
            this.openRowRefs.forEach(ref => {
                ref.closeRow!=null && ref.closeRow();
            });
            this.openRowRefs = []
        }
       
    }
    render() { 
        return ( 
            <Container style={{margin:10}}>
                <Form style={{marginBottom : 10}}>
                    <Item regular style={{padding:5}}>
                        <Input autoCapitalize={true} onFocus={this.closeAllOpenRows} value={this.state.todoDescription} onChange={this.handleChange} placeholder="Description" />
                        <Button onPress = {this.addTodo} style={{backgroundColor:'#444'}}>
                            <Text>{this.state.editMode ? "save" : "add"}</Text>
                        </Button>
                    </Item>
                </Form>
                {this.state.todo.length>0 ? 
                <SwipeListView
                onRowDidOpen = {this.onRowDidOpen}
                closeOnRowOpen={false}
                data={this.state.todo}
                renderItem={ (data, rowMap) => (
                    <TouchableHighlight onPress={()=>this.closeRow(rowMap,data.item.key)}>
                        <View style={styles.rowFront}>
                            <Text>{data.item.description}</Text>
                        </View>
                    </TouchableHighlight>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                    <Button transparent onPress={()=>this.setState({todoDescription:data.item.description,id_edit:parseInt(data.item.key),editMode:true})}>
                        <Text style={{color:'#55f'}}>Edit</Text>
                    </Button>
                    <Button transparent onPress={()=>this.deleteTodo(parseInt(data.item.key))}>
                        <Text style={{color:'#f55'}}>Delete</Text>
                    </Button>
                    
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
                />
                :<Text style={{textAlign:"center"}}>Nothing to show ! add todo </Text>  }
            </Container>
         );
    }
}
 
export default Todo;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#dadada',
        borderColor: '#999',
        borderWidth: 0.2,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#222',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});