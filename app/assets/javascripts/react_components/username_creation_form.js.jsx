var UsernameCreationForm = React.createClass({

  getInitialState: function() {
    return {
      username: ""
    };
  },

  componentDidMount: function() {
    console.log(this.props.user);
  },

  renderValidUsername: function() {
    $(React.findDOMNode(this.refs.blankUsernameMessage)).addClass("hide");
    $(React.findDOMNode(this.refs.invalidCharactersMessage)).addClass("hide");
    $(React.findDOMNode(this.refs.usernameTakenMessage)).addClass("hide");
    $(React.findDOMNode(this.refs.usernameField)).removeClass("invalid");
    $(React.findDOMNode(this.refs.createUsernameButton)).removeClass("disabled");
  },

  renderBlankUsername: function() {
    $(React.findDOMNode(this.refs.blankUsernameMessage)).removeClass("hide");
    $(React.findDOMNode(this.refs.usernameField)).addClass("invalid");
    $(React.findDOMNode(this.refs.createUsernameButton)).addClass("disabled");
  },

  renderUsernameTaken: function() {
    $(React.findDOMNode(this.refs.usernameTakenMessage)).removeClass("hide");
    $(React.findDOMNode(this.refs.usernameField)).addClass("invalid");
    $(React.findDOMNode(this.refs.createUsernameButton)).addClass("disabled");
  },

  renderInvalidCharactersUsername: function() {
    $(React.findDOMNode(this.refs.invalidCharactersMessage)).removeClass("hide");
    $(React.findDOMNode(this.refs.usernameField)).addClass("invalid");
    $(React.findDOMNode(this.refs.createUsernameButton)).addClass("disabled");
  },

  validateAndMapDomain: function(domain) {
    $.get("/institutions/mapping?domain=" + domain,
          {},
          function(resp){
            var span = React.findDOMNode(this.refs.institutionName)
            span.innerHTML = resp["name"] + ' (<a href="/support">Incorrect?</a>)';
          }.bind(this));
  },

  validateUsername: function(username) {
    if (username === "") {
      this.renderBlankUsername("");
      return;
    }

    $(React.findDOMNode(this.refs.createUsernameButton)).addClass("disabled");
    var request = new XMLHttpRequest();

    request.open('GET', "/users/username/" + username, true);

    request.onload = function() {
      if (request.status === 200) {
        this.renderUsernameTaken();
      } else if (!/^\w+$/.test(username)) {
        this.renderInvalidCharactersUsername();
      } else {
        this.renderValidUsername();
      }
    }.bind(this);

    request.send();
  },

  handleUsernameTextAreaChange: function() {
    var username = React.findDOMNode(this.refs.usernameField).value;
    React.findDOMNode(this.refs.profilePathExample).innerHTML = username;
    this.validateUsername(username)
  },

  handleHomeInstitutionTextAreaChange: function() {
    var email = React.findDOMNode(this.refs.homeInstitutionEmailField).value;
    var domain = email.replace(/.*@/, "");
    this.validateAndMapDomain(domain);
  },

  handleSubmitButtonClick: function(evt) {
    evt.preventDefault();
    var username = React.findDOMNode(this.refs.usernameField).value;
    var homeInstitutionEmail = React.findDOMNode(this.refs.homeInstitutionEmailField).value;

    if (username === "") {
      return;
    } else {
      $.ajax({
        url: "/users/" + this.props.user_id,
        type: "PUT",
        data: {
          user: {
            username: username,
            home_email: homeInstitutionEmail
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
      <div className="row">
        <div className="col offset-m2 m8">
          <form className="row">
            <div className="row">
              <h3>Complete your profile</h3>
            </div>
            <div className="row">
              <h5><span>This will be your profile URL:<br />exchangehunt.com/users/</span><span ref="profilePathExample"></span></h5>
              <h6><span className="red-text hide flow-text" ref="blankUsernameMessage">Username cannot be blank.</span></h6>
              <h6><span className="red-text hide flow-text" ref="usernameTakenMessage">Username in use, please choose another username.</span></h6>
              <h6><span className="red-text hide flow-text" ref="invalidCharactersMessage">Username can only contain alphanumeric characters and underscore: A-Z 0-9 _</span></h6>
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input id="username_field" type="text" className="validate" onChange={this.handleUsernameTextAreaChange} ref="usernameField"></input>
                <label htmlFor="username_field" className="flow-text">Username</label>
              </div>
            </div>

            <div className="row">
              <h5 className="inline">Verify your home institution email</h5>
              <div>Your institution: <span ref="institutionName"></span></div>
              <div className="input-field">
                <i className="material-icons prefix">home</i>
                <input id="home_email_field" type="text" className="validate" ref="homeInstitutionEmailField" onChange={this.handleHomeInstitutionTextAreaChange}></input>
                <label htmlFor="home_email_field">Home Institution Email</label>
              </div>
            </div>

            <div className="row center">
              <button className="btn center waves-effect waves-light btn-large disabled"
                ref="createUsernameButton"
                type="submit"
                onClick={this.handleSubmitButtonClick}><i className="material-icons left">send</i>Create</button>
            </div>

          </form>
        </div>
      </div>
    );
  }

});

module.exports = UsernameCreationForm;
