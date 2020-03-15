import React, { Component } from 'react';
import './Main.css';
import { connect } from "react-redux";
import { StopCardContainer } from './StopCard';
import { DataTable } from './TransactionTable';


const mapStateToProps = state => {
  return state;
}

class MainContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      stops: this.props.stopsData.stops,
      searchFilter: ""
    }
  }

  static getDerivedStateFromProps(props,state){
       return {
         stops: props.stopsData.stops
       }
  }

  filterStops = (filter)=>{
      this.setState({
        searchFilter: filter
      }/* , () => {
        this.updateStateStops();
      } */)
  }

  render() {
    const stops = this.state.stops.map((stop) => {
      return stop.name.includes(this.state.searchFilter) ? <StopCardContainer data={stop}/> : null
    })
    return (
      <section>
        <div className="data-container">
          <div className="table-label">Transactions for all donations:</div>
          <div className="transaction-table">
            <DataTable/>
          </div>
        </div>
        <div className="stop-container">
        <div className="searchBar">
          <input value={this.state.searchFilter} onChange={e => this.filterStops(e.target.value)} type="text" id="myInput" placeholder="Search for Bus stop names" title="Type in a name"/>
          </div>
          <div className="card-container">
              {stops}
          </div>          
        </div>
      </section>
    );
  }
}

export const Main = connect(mapStateToProps)(MainContainer);
