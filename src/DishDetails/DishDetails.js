
import React, { Component } from 'react';
import './DishDetails.css';
import DishInformation from '../DishInformation/DishInformation';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';


class DishDetails extends Component {
  
	constructor(props){
		super(props)
		
		this.state = {
			nGuests: this.props.model.getNumberOfGuests(),
			status: 'INITIAL',
			dish: null
		}
	}
	
	/* 'componentDidMount' is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. */
	componentDidMount() {
		this.props.model.addObserver(this)
		
		// 'this.props.match.params.id' -> the ID of the dish that was pressed.
	  this.props.model.getDish(this.props.match.params.id).then(dish => {
      this.setState({
        status: 'LOADED',
        dish: dish
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })	
	}

  componentWillUnmount() {
  	this.props.model.removeObserver(this)
	}
	
	update() {
  	this.setState({
  		nGuests: this.props.model.getNumberOfGuests()
  		})
	}
	
	
  render() {
		var dish;
	
    switch (this.state.status) 
		{
      case 'INITIAL':
        dish = <em>Loading...</em>
        break;
      case 'LOADED':
        dish = this.state.dish
        break;
      default:
        dish = <b>There was a problem loading the data...</b>
        break;
    }		
		
		return (
      <div className="DishDetails row">
        <Sidebar model={this.props.model}/>
        <DishInformation dish={this.state.dish} model={this.props.model}/>
			</div>			
    )
	}
}

export default DishDetails;




