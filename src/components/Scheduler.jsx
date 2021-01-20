import React, { Component } from 'react';
import moment, { parseZone } from 'moment'
import axios from 'axios'
import { AppointmentPicker } from 'react-appointment-picker';

export default class Scheduler extends Component {
  state = {
    continuousLoading: false
  };

  async addAppointment(time) {
    try {
      await axios.post("localhost:5000/schedule-appointment", {
        date: time,
        hospitalId: this.props.hospitalId
      }, {
        headers: {
          "authorization": "Bearer token",
      }})
    }
    catch (e) {

    }
  }

  async removeAppointment() {
    try {
      await axios.post("localhost:5000/remove-appointment", {
        hospitalId: this.props.hospitalId
      }, {
        headers: {
          "authorization": "Bearer token",
      }})
    }
    catch (e) {
      
    }
  }

  addAppointmentCallbackContinuousCase = ({
    addedAppointment: { day, number, time, id },
    addCb,
    removedAppointment: params,
    removeCb
  }) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        await this.removeAppointment()
        if (removeCb) {
          removeCb(params.day, params.number);
        }
        await this.addAppointment()
        addCb(day, number, time, id);
        this.setState({ continuousLoading: false });
      }
    );
  };

  removeAppointmentCallbackContinuousCase = (
    { day, number, time, id },
    removeCb
  ) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        await this.removeAppointment()
        removeCb(day, number);
        this.setState({ continuousLoading: false });
      }
    );
  };

  findDate(arr, date) {
    for(let i = 0; i < arr.length; i++) {
      if(moment(arr[i]).isSame(date)) {
        return true
      }
    }
    return false
  }

  generateDays () {
    const startHour = this.props.startHour
    const endHour = this.props.endHour
    let currentHour
    
    let days = []
    for(let i = 0; i < 7; i++) {
      currentHour = moment(Object.assign({}, this.props.startHour))
      let day = []
      let j = 0
      while(currentHour.isBefore(endHour) || currentHour.isSame(endHour)) {
        if(this.findDate(this.props.availableHours[i], currentHour)) {
          day.push({number: j})
        }
        else {
          day.push({number: j, isReserved: true})
        }
        currentHour = currentHour.add(60, 'minutes')
        j++
      } 
      days.push(day)     
    }
    return days
  }

  render() {
  
    const days = this.generateDays()
    const { loading, continuousLoading } = this.state;
    console.log(this.generateDays())
    return (
      <div>
        <AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallbackContinuousCase}
          removeAppointmentCallback={
            this.removeAppointmentCallbackContinuousCase
          }
          initialDay={new Date(this.props.startHour)}
          days={days}
          maxReservableAppointments={1}
          alpha
          visible
          selectedByDefault
          loading={continuousLoading}
          unitTime={60 * 60 * 1000}
          continuous
        />
      </div>
    );
  }
}