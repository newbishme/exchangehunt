var UserEditProfileApp = React.createClass({

  componentDidMount: function() {
    this.updateView();
  },

  updateView: function() {
    Materialize.updateTextFields();
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 1, // Creates a dropdown of 15 years to control year
      min: -60
    });
    this.forceUpdate();
  },

  validateAndMapHomeDomain: function(domain) {
    $.get("/institutions/mapping?domain=" + domain,
          {},
          function(resp){
            var span = React.findDOMNode(this.refs.homeInstitutionName)
            span.innerHTML = 'Your Home Institution: ' + resp["name"] + ' (<a href="/support">Incorrect?</a>)';
          }.bind(this));
  },

  validateAndMapExchangeDomain: function(domain) {
    $.get("/institutions/mapping?domain=" + domain,
          {},
          function(resp){
            var span = React.findDOMNode(this.refs.exchangeInstitutionName)
            span.innerHTML = 'Visiting: ' + resp["name"] + ' (<a href="/support">Incorrect?</a>)';
          }.bind(this));
  },

  handleHomeInstitutionEmailInputFieldChange: function() {
    var email = React.findDOMNode(this.refs.homeEmailField).value;
    var domain = email.replace(/.*@/, "");
    this.validateAndMapHomeDomain(domain);
  },

  handleExchangeInstitutionEmailInputFieldChange: function() {
    var email = React.findDOMNode(this.refs.exchangeEmailField).value;
    var domain = email.replace(/.*@/, "");
    this.validateAndMapExchangeDomain(domain);
  },

  handleSubmitButtonClick: function() {
    var citizenship = React.findDOMNode(this.refs.citizenshipField).value;
    var course = React.findDOMNode(this.refs.courseField).value;
    var homeInstitutionEmail = React.findDOMNode(this.refs.homeEmailField).value;
    var exchangeInstitutionEmail = React.findDOMNode(this.refs.exchangeEmailField).value;
    var startDate = React.findDOMNode(this.refs.startDateField).value;
    var endDate = React.findDOMNode(this.refs.endDateField).value;
    var bio = React.findDOMNode(this.refs.bioField).value;

    if (citizenship === "") {
      if (this.props.user.citizenship === "") {
        return;
      } else {
        citizenship = this.props.user.citizenship;
      }
    }

    if (course === "") {
      return;
    } else if (exchangeInstitutionEmail !== "" && (startDate === "" || endDate === "")){
      return;
    } else {
      $.ajax({
        url: "/users/" + this.props.user.id,
        type: "PUT",
        data: {
          user: {
            citizenship: citizenship,
            course: course,
            home_email: homeInstitutionEmail,
            exchange_email: exchangeInstitutionEmail,
            bio: bio
          },
          usr_instn_connect_home: {
            user_id: this.props.user.id,
            institution_id: this.props.user.home_institution.id,
            is_home_institution: true
          },
          usr_instn_connect_exchange: {
            user_id: this.props.user.id,
            institution_id: 2,
            start_date: startDate,
            end_date: endDate,
            is_home_institution: false
          }
        },
        success: function(username) {
          window.location.href = "/users/" + username;
        }.bind(this),
        error: function(response) {
          console.log(response);
        }.bind(this)
      });
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
            <div className="col s7">
              <h2 className="avenir-65 inline">
                <span className="primary-text-color inline">{this.props.user.first_name} {this.props.user.last_name}</span>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col s9 offset-s3">
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">language</i>
                  <select ref="citizenshipField" defaultValue={this.props.user.citizenship}>
                    <option value="">Select your citizenship</option>
                    <option value="SINGAPOREAN">SINGAPOREAN</option>
                    <option value="AMERICAN">AMERICAN</option>
                    <option value="ALL OTHERS">ALL OTHERS</option>
                  </select>
                  <label>Citizenship</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">school</i>
                  <input placeholder="Enter your field of study" defaultValue={this.props.user.course} id="course" type="text" ref="courseField" onChange={this.handleChange}></input>
                  <label htmlFor="course">Field of Study</label>
                </div>
              </div>

              <div className="row">
                <div className="col s8">
                  <span className="avenir-85" ref="homeInstitutionName"></span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <div className="row">
                    <i className="material-icons prefix">home</i>
                    <input placeholder="Enter your home institution's email" defaultValue={this.props.user.home_email} id="home_institution" type="text" ref="homeEmailField" className="validate" onChange={this.handleHomeInstitutionEmailInputFieldChange}></input>
                    <label htmlFor="home_institution">Home institution email</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col s8">
                  <span className="avenir-85" ref="exchangeInstitutionName"></span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">mail</i>
                  <input placeholder="Enter your exchange institution's email" defaultValue={this.props.user.exchange_email} id="exchange_institution" type="text" ref="exchangeEmailField" className="validate" onChange={this.handleExchangeInstitutionEmailInputFieldChange}></input>
                  <label htmlFor="exchange_institution">Exchange institution email (Optional)</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">today</i>
                  <input id="start_date" type="date" className="datepicker" placeholder="Start date" ref="startDateField"></input>
                  <label className="active" htmlFor="start_date">Start date of exchange (Optional)</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">event</i>
                  <label className="active" htmlFor="end_date">End date of exchange (Optional)</label>
                  <input id="end_date" type="date" className="datepicker" placeholder="End date" ref="endDateField"></input>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">info_outline</i>
                  <textarea placeholder="Enter something about yourself" defaultValue={this.props.user.bio} id="bio" type="text" className="materialize-textarea" ref="bioField"></textarea>
                  <label htmlFor="bio">Bio</label>
                </div>
              </div>
              <div className="row">
                <div className="col s8">
                  <button className="btn center waves-effect waves-light btn-medium right"
                    ref="saveChangesButton"
                    type="submit"
                    onClick={this.handleSubmitButtonClick}>
                    <i className="material-icons left">save</i>
                    Save changes
                  </button>
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
