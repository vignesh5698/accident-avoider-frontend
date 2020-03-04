import React, { Component } from 'react';
import Firebase from "firebase";
import _ from 'lodash';

class DrowsinessViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({
          drowsinessList: formattedDrowsinessList
        });
      });
  };

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

  render() {
    return (
      <div>
        <br></br>
        <h2>
          Accident Avoider Monitor
        </h2>
        <br></br>
        {this.renderDrowsinessList()}
      </div>
    );
  }
}
 
export default DrowsinessViewer;