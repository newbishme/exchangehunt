var UserProfileApp = React.createClass({

  componentDidMount: function() {
    var url = "/users/" + this.props.username + ".json"
    $.get(url, function(response) {
      this.updateUserObject(response);
    }.bind(this));
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

  renderEditProfileButton: function() {
    if (this.props.is_users_profile) {
      var editUrl = "/users/" + this.props.username + "/edit";
      return (
        <div className="row edit-profile">
          <div className="col s5 offset-s3">
            <a className="waves-effect waves-light btn" href={editUrl}><i className="material-icons left">edit</i>Edit profile</a>
          </div>
        </div>
      );
    }
  },

  renderDropMessageButton: function() {
    if (!this.props.is_users_profile) {
      return (
        <div>
          <a className="waves-effect waves-light btn"><i className="material-icons left">mail</i>Drop a message</a>
        </div>
      );
    }
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
            	  <span className="primary-text-color inline">{this.state.user.first_name} {this.state.user.last_name}</span>
            	</h2>
            </div>
          </div>
          {this.renderEditProfileButton()}
          <div className="row">
            <div className="col s6 offset-s3">
          	  <span>SINGAPOREAN</span><br/>
          	  <span>COMPUTER SCIENCE</span><br/>
          	  <span>NATIONAL UNIVERSITY OF SINGAPORE</span><br/>
              <div className="row"></div>
          	  <span className="avenir-85">Visiting:</span><br/>
          	  <span>NANYANG TECHNOLOGICAL UNIVERSITY</span><br/>
          	  <span>2015-2016</span><br/>
              {this.renderDropMessageButton()}
          	  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis arcu, porttitor in mauris eget, iaculis lobortis tortor. Etiam pretium molestie lacus. Fusce ultrices eget elit et auctor.</span><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = UserProfileApp;
