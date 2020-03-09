import React, { Component } from 'react';
import Firebase from "firebase";
import _ from 'lodash';

class DrowsinessViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      drowsinessList: null
    }
  }

  componentDidMount() {
    this.getDrowsinessData();
  }

  getDrowsinessData = () => {
      let ref = Firebase.database().ref(`/sleep_list`);
      ref.on("value", snapshot => {
        const state = snapshot.val();
        const formattedDrowsinessList = this.getFormattedDrowsinessList(state);
        const sortedList = [...formattedDrowsinessList].sort(this.Comparator);
        const reversedList = [...sortedList].reverse();
        this.setState({
          drowsinessList: reversedList,
          isDataLoaded: true
        });
      });
  };

  Comparator = (a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }

  getFormattedDrowsinessList = (drowsinessList) => {
    const formattedList = _.map(drowsinessList, (sleepingTimes, name) => {
      return _.map(sleepingTimes, (locationObj, time) => {
        return [name, time, locationObj.location];
      })
    })
    return _.flatten(formattedList);
  }

  renderDrowsinessList = () => {
    const { drowsinessList } = this.state;
    const tableContent = _.map(drowsinessList, (item, index) => {
      return (
        <tr key={index}>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
          <td>{item[2]}</td>
        </tr>
      )
    })
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Sleeping time</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      </div>
    );
  }

  renderTable = () => {
    return (
      <div className="card custom-card-new">
        <h3 className="card-header custom-title">
          Accident Avoider Monitor
        </h3>
        <div className="card-body">
          {this.renderDrowsinessList()}
        </div>
      </div>
    );
  }

  renderLoadingBar = () => {
    return (
      <div className="progress custom-bar2">
        <div className="progress-bar progress-bar-striped progress-bar-animated custom-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" >
          <h4>Loading</h4>
        </div>
      </div>
    );
  }
  render() {
    const { isDataLoaded } = this.state;
    return (
      <div className='custom-bg'>
        {isDataLoaded ? this.renderTable() : this.renderLoadingBar()}
      </div>
    );
  }
}
 
export default DrowsinessViewer;