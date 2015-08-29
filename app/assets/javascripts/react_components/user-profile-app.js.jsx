var UserProfileApp = React.createClass({

  componentDidMount: function() {
    console.log(this.props.user);
    console.log(this.props.is_users_profile);
  },

  getInitialState: function() {
    return {
      user: {}
    };
  },

  updateUserObject: function(user) {
    this.setState({
      user: user
    }, function() {
      this.updateView();
    }.bind(this));
  },

  updateView: function() {
    this.forceUpdate();
  },

  render: function() {
    return (
      <div className="container">
        <div className="section">
          <div className="row valign-wrapper profile-image-row">
            <div className="col s3">
              <img src={this.state.user.image_url} className="circle responsive-img right profile-image-size" />
            </div>
            <div className="col s7 ">
            	<h2 className="avenir-65 inline">
            	  <span className="primary-text-color inline">{this.state.user.first_name}</span>
            	</h2>
            </div>
          </div>
            <div className="row edit-profile">
              <div className="col s5 offset-s3">
                <a className="waves-effect waves-light btn"><i className="material-icons left">edit</i>Edit profile</a>
              </div>
            </div>
          <div className="row"></div>
          <div className="row">
            <div className="col s6 offset-s3">
          	  <span>SINGAPOREAN</span><br/>
          	  <span>COMPUTER SCIENCE</span><br/>
          	  <span>NATIONAL UNIVERSITY OF SINGAPORE</span><br/>
              <div className="row"></div>
          	  <span className="avenir-85">Visiting:</span><br/>
          	  <span>NANYANG TECHNOLOGICAL UNIVERSITY</span><br/>
          	  <span>2015-2016</span><br/>
              <div className="row"></div>
              <div className="row"></div>
          	  <a className="waves-effect waves-light btn"><i className="material-icons left">mail</i>Drop a message</a>
              <div className="row"></div>
              <div className="row"></div>
          	  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis arcu, porttitor in mauris eget, iaculis lobortis tortor. Etiam pretium molestie lacus. Fusce ultrices eget elit et auctor.</span><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = UserProfileApp;
