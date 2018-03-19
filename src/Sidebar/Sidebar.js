import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';



class Sidebar extends Component {

  constructor(props) {
    super(props)
    
    // We put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }

  // our handler for the input's on change event
	/*
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }*/
	onNumberOfGuestsChanged = (increment) => {
		var nGuests = this.state.numberOfGuests;
		
		nGuests += increment;
		
		if(nGuests <0){
			nGuests = 0;
		}
		
		this.props.model.setNumberOfGuests(nGuests);
}
	

  render() {
    return (
      <div className="Sidebar col-sm-2">
        <h1>My Dinner</h1>
				<p>Number Of Guests: <span id="nGuests">{this.state.numberOfGuests}</span></p>

				<div>
					<button	className="btn" onClick={() => this.onNumberOfGuestsChanged(-1)}>
						{/*glyphicon glyphicon-minus is not working I'm not sure why */}
						<span className="glyphicon glyphicon-minus"> - </span>
					</button>
					<button className="btn" onClick={() => this.onNumberOfGuestsChanged(1)}>
						<span className="glyphicon glyphicon-plus"> + </span>
					</button>		
				</div> 
			
				<div className="row" >
					{/* left div */}
					<div className="col-md-6 noPadding floatLeft" >
						<p className="textAlignLeft">Dish Name</p>                    
					</div>

					{/* right div */}
					<div className="col-md-6">
						<p className="textAlignRight">Cost</p>
					</div>
				</div>

				<div >
					{/* left div */}
					<div className="col-md-6 noPadding floatLeft" >
					 <p className="textAlignLeft">TOTAL </p>                    
					</div>

					{/* right div */}
					 <div className="col-md-6">
					 <p id="total_cost" className="textAlignRight">SEK 0.00</p>
					 </div>                        
				</div>

				<div className="col-md-12 text-center" id="confirmDinnerButton">
				<Link to="/summary">

					<button id="confirm_dinner_button" type="button" className="btn btn-primary">Confirm Dinner</button>
					</Link>
				</div>

			  {/* This is what we had on the Template:
        <p>
        People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        Total number of guests: {this.state.numberOfGuests}
        </p>
				*/}
      </div>
    );
  }
}

export default Sidebar;
