import React, { Component } from "react";
import axios from 'axios'
import Loader from "react-loader-spinner"

const style = 
	{
	 position: "fixed",
	 top: "50%", 
	 left: "50%",
	 transform: "translate(-50%, -50%)"
	};

export default class ClientInfo extends Component {

  constructor(props) {

		super(props);

		this.state = {
			isLoading: false,
			client: []
		}

		this.onDeleteClient = this.onDeleteClient.bind(this)
	}
  
  componentDidMount(){
  	 axios.get('/client/')
  	 .then(res => {
  	 	this.setState({
  	 		client: res.data,
  	 		isLoading: true
  	 	})
  	 })
  }

  onDeleteClient(e, id) {

  	 axios.delete('/client/delete/'+id)
  	 .then(res => {
  	 		this.setState({
  			client: this.state.client.filter(data => data._id !== id)
  		})
  	 })

  }


  render() {
	 	return (
	 		 <div>
	 		  <table className="table table-hover">
				  <thead>
				    <tr>
				    <th scope="col">#</th>
				      <th scope="col">Name</th>
				      <th scope="col">Phone Number</th>
				      <th scope="col">City</th>
				      <th scope="col">Max Temp</th>
				      <th scope="col">Min Temp</th>
				        <th scope="col">Average Temp</th>
				      <th scope="col">Condition</th>
				      <th scope="col">Action</th>
				    </tr>
				  </thead>
				  {
				  	this.state.isLoading ? 
				  	(
				  		<tbody>
				  			 {
			  	this.state.client.map((data, i) =>
			  	  <tr>
			      <td key={i}>{i}</td>
			      <td >{data.name}</td>
			      <td>{data.number}</td>
			      <td>{data.city}</td>
			      <td>{data.max}&nbsp;°c</td>
			       <td>{data.min}&nbsp;°c</td>
			        <td>{data.avg}&nbsp;°c</td>
			       <td>{data.condition}</td>
			      <td>
 					<button onClick={(e) => this.onDeleteClient(e, data._id)} className="btn btn-danger">Delete</button>
 					</td>
			  	  </tr>
			  	)
			  }
				  		</tbody>
				  	) : 
				  	(
				  		<span style={style}>
					  	<Loader
				         type="ThreeDots"
				         color="#00BFFF"
				         height={100}
				         width={100}
				         timeout={3000} //3 secs
		     			 />
		     			</span>
				  	)
				  }
			 </table>
	 		 </div>
	 	 )
	 }
}