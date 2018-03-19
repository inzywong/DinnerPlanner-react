import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
			
					<div className="container-fluid myPadding" id="homeView" >
							<div className="text-center" id="introductionTextContainer">
                <center>
                <div className="col-md-6">
								<p className="textJustifyCenter"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
									standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
									to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
									sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
									including versions of Lorem Ipsum.</p>
                  </div>
                  </center>
								<div className="col-md-12 text-center">
									<Link to="/search">
										<button type="button" className="btn btn-primary" id="createDinnerButton">Create a new dinner</button>
									</Link>
								</div>

							</div>
							<div className="col-sm-3"></div>
					</div>	

			
			
			{/*				<p class="textJustifyCenter"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
						standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
						to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
						typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
						sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
						including versions of Lorem Ipsum.</p>
			
        <p>
            Welcome to the dinner planner React Startup code!
        </p>
        
        <Link to="/search">
            <button>Start planning</button>
        </Link>*/}

      </div>
    );
  }
}

export default Welcome;
