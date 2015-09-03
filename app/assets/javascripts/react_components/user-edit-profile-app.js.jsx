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
            var span = React.findDOMNode(this.refs.homeInstitutionName);
            span.innerHTML = 'Your Home Institution: ' + resp["name"] + ' (<a href="/support">Incorrect?</a>)';

            this.renderValidHomeInstitutionEmail();
          }.bind(this));
  },

  validateAndMapExchangeDomain: function(domain) {
    var request = $.get("/institutions/mapping?domain=" + domain);

    request.success(function(resp){
      var span = React.findDOMNode(this.refs.exchangeInstitutionName)
      span.innerHTML = 'Visiting: ' + resp["name"] + ' (<a href="/support">Incorrect?</a>)';

      this.renderValidExchangeInstitutionEmail();
    }.bind(this));

    request.error(function(resp){
      if (domain.length > 0) {
        var span = React.findDOMNode(this.refs.exchangeInstitutionName)
        span.innerHTML = 'Your institution is currently not recognised. Please contact <a href="https://exchangehunt.io/support">support</a>.';
      }
      this.renderInvalidExchangeInstitutionEmail();
    }.bind(this));
  },

  handleHomeInstitutionEmailInputFieldChange: function() {
    $(React.findDOMNode(this.refs.homeInstitutionName)).addClass("hide")
    var email = React.findDOMNode(this.refs.homeEmailField).value;
    var domain = email.replace(/.*@/, "");
    this.validateAndMapHomeDomain(domain);
  },

  handleExchangeInstitutionEmailInputFieldChange: function() {
    $(React.findDOMNode(this.refs.exchangeInstitutionName)).addClass("hide")
    $(React.findDOMNode(this.refs.startAndEndDates)).addClass("hide");
    var email = React.findDOMNode(this.refs.exchangeEmailField).value;
    var domain = email.replace(/.*@/, "");
    this.validateAndMapExchangeDomain(domain);
  },

  handleSubmitButtonClick: function() {
    var citizenship = React.findDOMNode(this.refs.citizenshipField).value;
    var course = React.findDOMNode(this.refs.courseField).value;
    var homeInstitutionEmail = React.findDOMNode(this.refs.homeEmailField).value;
    var exchangeInstitutionEmail = React.findDOMNode(this.refs.exchangeEmailField).value;
    var startMonth = React.findDOMNode(this.refs.startMonthField).value;
    var startYear = React.findDOMNode(this.refs.startYearField).value;
    var duration = React.findDOMNode(this.refs.durationField).value;
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
    } else if (exchangeInstitutionEmail !== "" && (startMonth === "" || startYear === "" || duration === "")){
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
            start_month: startMonth,
            start_year: startYear,
            duration: duration,
            is_home_institution: false
          }
        },
        success: function(username) {
          window.location.href = "/users/" + username;
        }.bind(this),
        error: function(response) {
          console.log(response);
          Materialize.toast('Invalid/Unrecognised institution email address!', 3000)
        }.bind(this)
      });
    }
  },

  renderValidHomeInstitutionEmail: function() {
    $(React.findDOMNode(this.refs.homeInstitutionName)).removeClass("hide")
  },

  renderValidExchangeInstitutionEmail: function() {
    $(React.findDOMNode(this.refs.exchangeInstitutionName)).removeClass("hide")
    $(React.findDOMNode(this.refs.startAndEndDates)).removeClass("hide");
  },

  renderInvalidExchangeInstitutionEmail: function() {
    $(React.findDOMNode(this.refs.exchangeInstitutionName)).removeClass("hide")
  },

  renderStartAndEndDates: function() {
    return (
      <div ref="startAndEndDates" className="hide">
        <div className="row">
          <div className="input-field col s4">
            <i className="material-icons prefix">today</i>
            <select id="start-month" ref="startMonthField" defaultValue="January">
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <label className="active" htmlFor="start-month">Starting month (Optional)</label>
          </div>
          <div className="input-field col s4">
            <select id="start-year" ref="startYearField" defaultValue="2015">
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </select>
            <label className="active" htmlFor="start-year">Starting year (Optional)</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s8">
            <i className="material-icons prefix">event</i>
            <select id="duration-months" ref="durationField" defaultValue="3">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
            <label className="active" htmlFor="duration-months">Duration of exchange in months(Optional)</label>
          </div>
        </div>
      </div>
    );
  },

  renderCitizenship: function() {
    var citizenship = "";

    if (this.props.user.citizenship != null) {
      citizenship = this.props.user.citizenship;
    }

    return (
      <div className="row">
        <div className="input-field col s8">
          <i className="material-icons prefix">language</i>
          <select ref="citizenshipField" defaultValue={citizenship}>
            <option value="">Select your citizenship</option>
            <option value="SINGAPOREAN">SINGAPOREAN</option>
            <option value="AMERICAN">AMERICAN</option>
            <option value="ALL OTHERS">ALL OTHERS</option>
          </select>
          <label>Citizenship</label>
        </div>
      </div>
    );
  },

  renderCourse: function() {
    var course = "";

    if (this.props.user.course != null) {
      course = this.props.user.course;
    }

    return (
      <div className="row">
        <div className="input-field col s8">
          <i className="material-icons prefix">school</i>
          <input placeholder="Enter your field of study" defaultValue={course} id="course" type="text" ref="courseField" onChange={this.handleChange}></input>
          <label htmlFor="course">Field of Study</label>
        </div>
      </div>
    );
  },

  renderHomeInstitution: function() {
    var home_email = "";

    if (this.props.user.home_email != null) {
      home_email = this.props.user.home_email;
    }

    return (
      <div className="row">
        <div className="input-field col s8">
          <i className="material-icons prefix">home</i>
          <input placeholder="Enter your home institution's email" defaultValue={home_email} id="home_institution" type="text" ref="homeEmailField" className="validate" onChange={this.handleHomeInstitutionEmailInputFieldChange}></input>
          <label htmlFor="home_institution">Home institution email</label>
        </div>
      </div>
    );
  },

  renderExchangeInstitutionEmail: function() {
    var exchange_email = "";

    if (this.props.user.exchange_email != null) {
      exchange_email = this.props.user.exchange_email;
    }

    return (
      <div className="row">
        <div className="input-field col s8">
          <i className="material-icons prefix">mail</i>
          <input placeholder="Enter your exchange institution's email" defaultValue={exchange_email} id="exchange_institution" type="text" ref="exchangeEmailField" className="validate" onBlur={this.handleExchangeInstitutionEmailInputFieldChange}></input>
          <label htmlFor="exchange_institution">Exchange institution email (Optional)</label>
        </div>
      </div>
    );
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
              {this.renderCitizenship()}
              {this.renderCourse()}

              <div className="row">
                <div className="col s8">
                  <span className="avenir-85" ref="homeInstitutionName"></span>
                </div>
              </div>

              {this.renderHomeInstitution()}

              <div className="row"></div>

              <div className="row">
                <div className="col s8">
                  <span className="avenir-85">Going for an exchange? Enter your exchange email to get started</span>
                </div>
              </div>
              <div className="row">
                <div className="col s8">
                  <span className="avenir-85" ref="exchangeInstitutionName"></span>
                </div>
              </div>

              {this.renderExchangeInstitutionEmail()}
              {this.renderStartAndEndDates()}

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
