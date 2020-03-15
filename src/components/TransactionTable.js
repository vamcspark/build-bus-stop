import React, { Component } from 'react';
import './TransactionTable.css';
import { connect } from "react-redux";
import Row from './RowComponent';

const mapStateToProps = state => {
  return state;
}

class TransactionTable extends Component {
 
constructor(props){
  super(props)
  this.state = {
    stops: []
  }
}

 static getDerivedStateFromProps(props, state){
     if(state.stops !== props.stopsData.stops){
            return {
              stops: props.stopsData.stops
            }
     }
 }


  render() {
    let table_rows = this.state.stops.map((stop) => {
        let rows = stop.funds.transactions.map((record) => {
            let data={name:stop.name, transaction: record }
            return <Row data={data}/>
      });
      return rows;
    });
     
    return (
        <div>
        <table id="myTable">
        <tr className="table-header">
          <th>Stop Name</th>
          <th>Donated By</th>
          <th>Amount(SG $)</th>
          <th>Date</th>
        </tr>
        {table_rows}
      </table>
      </div>
    );
  }
}

export const DataTable = connect(mapStateToProps)(TransactionTable);
