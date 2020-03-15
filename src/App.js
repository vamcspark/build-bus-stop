import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import {Main} from './components/MainContainer';
import {httpService} from './services/http-service';
import {saveStopsDataToStore} from './redux/actions'
import {StringConstants, ActionConstants} from './constants/constants';
let stops = require('./constants/data.json')



const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
      saveToStopsToStore: data => { dispatch(saveStopsDataToStore(data))},
  };
}

class AppContainer extends Component {
 
 constructor(props){
   super(props)
 }


 componentWillMount(){
   if(localStorage.getItem("stops") == undefined){
      localStorage.setItem("stops",JSON.stringify(stops));
   }
 }

 componentDidMount(){
   this.props.saveToStopsToStore({
     [StringConstants.STOPS_DATA]: JSON.parse(httpService.getAllStops())
    })
 }

 componentWillReceiveProps(props,nextProps){

 }
 
  render() {
    return (
      <div>
      <header>
        <div className="topnav">
         <a className="active" href="#home">Home</a>
         <a href="#news">News</a>
         <a href="#contact">Contact</a>
         <a href="#about">About</a>
         <div>Welcome to Build your bus stop</div>
        </div>
      </header>
      <Main/>
      <footer>Copyright @2020 FriarTuck</footer>
      </div>
    );
  }
}

export const App = connect(mapStateToProps,mapDispatchToProps)(AppContainer);
