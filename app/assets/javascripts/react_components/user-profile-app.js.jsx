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
      var messageUrl = "/messages/new?to=" + this.props.user.id;
      return (
        <div>
          <a href={messageUrl} className="waves-effect waves-light btn"><i className="material-icons left">mail</i>Drop a message</a>
          <br/>
        </div>
      );
    }
  },

  renderHomeInformation: function() {
    var homeVerifiedIcon = "";
    var citizenship = "";
    var course = "";
    var homeInstitution = ""

    if (this.props.user.home_institution_confirmed) {
      homeVerifiedIcon = "verified_user";
    }

    if (this.props.user.citizenship != null) {
      citizenship = this.props.user.citizenship.toUpperCase();
    }

    if (this.props.user.course != null) {
      course = this.props.user.course.toUpperCase();
    }

    if (this.props.user.home_institution != null) {
      homeInstitution = this.props.user.home_institution.name.toUpperCase();
    }

    return (
      <div>
        <span>{citizenship}</span><br/>
        <span>{course}</span><br/>
        <span>{homeInstitution}  <i className='material-icons verified-status'>{homeVerifiedIcon}</i></span><br/>
      </div>
    );
  },

  renderExchangeInformation: function() {
    if (this.props.user.exchange_institution.name != null) {
      var exchangeVerifiedIcon = "";
      var startMonth = "JANUARY";
      var startYear = "2015";
      var durationInMonths = "3";
      var monthText = "MONTH";

      if (this.props.user.exchange_institution_confirmed) {
        exchangeVerifiedIcon = "verified_user";
      }

      if (this.props.user.start_month != "") {
        startMonth = this.props.user.start_month;
        switch(startMonth) {
          case 1:
            startMonth = "JANUARY";
            break;
          case 2:
            startMonth = "FEBRUARY";
            break;
          case 3:
            startMonth = "MARCH";
            break;
          case 4:
            startMonth = "APRIL";
            break;
          case 5:
            startMonth = "MAY";
            break;
          case 6:
            startMonth = "JUNE";
            break;
          case 7:
            startMonth = "JULY";
            break;
          case 8:
            startMonth = "AUGUST";
            break;
          case 9:
            startMonth = "SEPTEMBER";
            break;
          case 10:
            startMonth = "OCTOBER";
            break;
          case 11:
            startMonth = "NOVEMBER";
            break;
          case 12:
            startMonth = "DECEMBER";
            break;
          default:
            startMonth = "JANUARY";
            break;
        }
      }

      if (this.props.user.start_year != "") {
        startYear = this.props.user.start_year;
      }

      if (this.props.user.duration_in_months != "") {
        durationInMonths = this.props.user.duration_in_months;

        if (durationInMonths <= 0) {
          durationInMonths = 1;
        }
      }

      if (durationInMonths > 1) {
        monthText = "MONTHS"
      }

      return (
        <div>
          <b><span className="avenir-75 primary-text-color">VISITING</span></b><br/>
          <span>{this.props.user.exchange_institution.name.toUpperCase()}  <i className='material-icons verified-status'>{exchangeVerifiedIcon}</i></span><br/>
          <span>{startMonth} {startYear}, {durationInMonths} {monthText}</span>
        </div>
      );
    }
  },

  renderAboutMe: function() {
    if (this.props.user.bio != "") {
      return (
        <div>
          <b><span className="avenir-75 primary-text-color">ABOUT ME</span></b><br/>
          <span><pre className="about-me">{this.props.user.bio}</pre></span><br/>
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
          	  {this.renderHomeInformation()}

              <div className="row"></div>

          	  {this.renderExchangeInformation()}
              {this.renderDropMessageButton()}

              <div className="row"></div>
              <div className="row"></div>

              {this.renderAboutMe()}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = UserProfileApp;
