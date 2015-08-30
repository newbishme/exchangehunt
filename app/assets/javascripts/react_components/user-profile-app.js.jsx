var UserProfileApp = React.createClass({

  renderEditProfileButton: function() {
    if (this.props.is_users_profile) {
      var editUrl = "/users/" + this.props.username + "/edit";
      return (
        <div className="row edit-profile">
          <div className="col s5 offset-s3">
            <a className="waves-effect waves-light btn" href={editUrl}><i className="material-icons left">edit</i>Edit profile</a>
            <br/>
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
          <br/>
        </div>
      );
    }
  },

  renderExchangeInformation: function() {
    if (this.props.user.exchange_institution != null) {
      return (
        <div>
          <span className="avenir-85">Visiting:</span><br/>
          <span>NANYANG TECHNOLOGICAL UNIVERSITY</span><br/>
          <span>2015-2016</span><br/>
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
              <img src={this.props.user.image_url} className="circle responsive-img right profile-image-size" />
            </div>
            <div className="col s7 ">
            	<h2 className="avenir-65 inline">
            	  <span className="primary-text-color inline">{this.props.user.first_name} {this.props.user.last_name}</span>
            	</h2>
            </div>
          </div>
          {this.renderEditProfileButton()}
          <div className="row"></div>
          <div className="row">
            <div className="col s6 offset-s3">
          	  <span>{this.props.user.citizenship.toUpperCase()}</span><br/>
          	  <span>{this.props.user.course.toUpperCase()}</span><br/>
              <span>{this.props.user.home_institution.name.toUpperCase()}</span><br/>

              <div className="row"></div>

          	  {this.renderExchangeInformation()}
              {this.renderDropMessageButton()}

              <div className="row"></div>
              
              <span>{this.props.user.bio.toUpperCase()}</span><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = UserProfileApp;
