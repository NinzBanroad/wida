import React, { Component } from "react"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"
import "./client.css";

const GetFormattedDate = (date) => {
		let month = date.getMonth() + 1
		let day = date.getDate()
		let year = date.getFullYear()

		return year + "-" + month + "-" + day
	}

const GetFormattedDateNextDay = (date) => {
		let month = date.getMonth() + 1
		let day = date.getDate() + 2
		let year = date.getFullYear()

		return year + "-" + month + "-" + day
	}

const ConvertCsv = (csv) => {
    let lines = [];
  const linesArray = csv.split('\n');
  // for trimming and deleting extra space 
	linesArray.forEach((e: any) => {
	    const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
	    lines.push(row);
	});
	// for removing empty record
	lines.splice(lines.length - 1, 1);
	const result = [];
	const headers = lines[0].split(",");

	for (let i = 1; i < lines.length; i++) {

	    const obj = {};
	    const currentline = lines[i].split(",");

	    for (let j = 0; j < headers.length; j++) {
	    obj[headers[j]] = currentline[j];
	    }
	    result.push(obj);
	}

	 return result;
}

export default class CreatClientInfo extends Component {

	constructor(props) {
		super(props);

		this.onChangeDate = this.onChangeDate.bind(this);
		this.onChangeCsv = this.onChangeCsv.bind(this);
		this.onSubmit = this.onSubmit.bind(this)

		this.state = {
			date: new Date(),
			client: [],
			csv: [],
			isLoading: '',
			error: ''
		}
	}


	onChangeDate(date) {
		this.setState({
			date: date
		})
	}

	onChangeCsv(e) {
      let files = e.target.files

	   const reader = new FileReader();
		reader.readAsText(files[0]);
		reader.onload = () => {
	    const text = reader.result;
	    const csv = ConvertCsv(text);
        this.setState({
        	csv: csv
        })
  }
}	

	onSubmit(e) {
		e.preventDefault();

		if(this.state.csv.length === 0) {
			this.setState({
				isLoading: false,
				error: 'Please upload a csv file'
			})

		} else {

			let date = GetFormattedDate(this.state.date)

		 this.setState({ isLoading: true });


		for (var i = 0; i < 5; i++) {
		  let name = this.state.csv[i].["name.first"]
		  let city = this.state.csv[i].["location.city"]
		  let number = this.state.csv[i].phone		

		  axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ad05d6c949974ef789c25002202310&q=${this.state.csv[i].["location.city"]}&days=10`)
	  	  .then(res => {
	  	  	let _date = res.data.forecast.forecastday

	  	  	for (var i = 0; i < _date.length; i++) {
	  	  			
	  	  	if(_date[i].date === date){
	  	  		let max = res.data.forecast.forecastday[0].day.maxtemp_c
		  		let min = res.data.forecast.forecastday[0].day.mintemp_c
		  		let avg = res.data.forecast.forecastday[0].day.avgtemp_c
		  		let condition = res.data.forecast.forecastday[0].day.condition.text


	  		let data = {
	  			name,
	  			city,
	  			number,
	  			max,
	  			min,
	  			avg,
	  			condition
	  		}
 			

 			axios.post('/client/add', data)
            .then(res => {

            	if(res.data === 'Client Added!') {
            		this.setState({ isLoading: false, error: ''});
            		window.location = '/'
            	}
             })
            break;
	  	  } else {
	  	  			this.setState({
		  	  		isLoading: false,
		  	  		error: `Can't fetch weather from that date! Please change date from ${GetFormattedDate(new Date())} until ${GetFormattedDateNextDay(new Date())}`
	  	  	      })
	  	        }
	  	  	}
	  	
	  	 })

	  }


	}

		
  }

	render() {
		return (
			<div className="containers">
 			<form onSubmit={this.onSubmit}>
 			<label>Upload Csv: </label>&nbsp;<span className="error">*</span>
 				<div className="form-group">
 					 <input type="file" name="file" onChange={(e) => this.onChangeCsv(e)} />
 				</div>
 				<label>Date:</label> &nbsp;<span className="error">*</span>
 				<div className="form-group">
 					<DatePicker 
 					 selected = {this.state.date}
 					 onChange={this.onChangeDate}
 					/>
 				</div>
 				<div className="form-group">
 					<button
 					 type="submit"
 					 value="Submit"
 					 className="btn btn-primary"
 					  >
 					  Submit
 					  {
 					   	this.state.isLoading ? (
			              <span className="spinner-border spinner-border-sm ml-5"
             			role="status"
                        aria-hidden="true">
		     			</span>
			            ) : (
      						<span></span>
           			 )}
 					</button>&nbsp;
 					<span className="error">{this.state.error}</span>
 				</div>
 			</form>
 			</div>
		)
	}
}