var UserEditProfileApp = React.createClass({

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
    Materialize.updateTextFields();
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
            <div className="col s7">
              <h2 className="avenir-65 inline">
                <span className="primary-text-color inline">{this.state.user.first_name} {this.state.user.last_name}</span>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col s9 offset-s3">
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">language</i>
                  <input placeholder="Enter your citizenship" id="citizenship" type="text"></input>
                  <label htmlFor="citizenship">Citizenship</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">school</i>
                  <input placeholder="Enter your field of study" id="course" type="text"></input>
                  <label htmlFor="course">Field of Study</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">home</i>
                  <input disabled placeholder="NATIONAL UNIVERSITY OF SINGAPORE" id="home_institution" type="text"></input>
                  <label htmlFor="home_institution">Home institution</label>
                </div>
              </div>
              <div className="row">
                <div className="col s8">
                  <span className="avenir-85">Visiting:</span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">mail</i>
                  <input placeholder="Enter your exchange institution's email" id="exchange_institution" type="text"></input>
                  <label htmlFor="exchange_institution">Exchange institution email (Optional)</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">today</i>
                  <input placeholder="Starting period of exchange" id="start_date" type="text"></input>
                  <label htmlFor="start_date">Starting date of exchange (Optional)</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">event</i>
                  <input placeholder="Ending period of exchange" id="end_date" type="text"></input>
                  <label htmlFor="end_date">Ending date of exchange (Optional)</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">info_outline</i>
                  <textarea placeholder="Enter something about yourself" id="bio" type="text" className="materialize-textarea"></textarea>
                  <label htmlFor="bio">Bio</label>
                </div>
              </div>
              <div className="row">
                <div className="col s8">
                  <a className="waves-effect waves-light btn right"><i className="material-icons left">save</i>Save changes</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = UserEditProfileApp;
