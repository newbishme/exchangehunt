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

  validateUsername: function(username) {
    $(React.findDOMNode(this.refs.createUsernameButton)).addClass("disabled");

    var request = new XMLHttpRequest();
    request.open('GET', "/users/username/" + username, true);
    request.onload = function() {
      if (request.status === 200) {
        this.renderUsernameTaken();
      } else {
        this.renderValidUsername();

        if (username === "") {
          this.renderBlankUsername("");
          return;
        }
        this.renderValidUsername();

        if (!/^\w+$/.test(username)) {
          this.renderInvalidCharactersUsername();
          return;
        }
        this.renderValidUsername();

      }
    }.bind(this);

    request.send();
  },

  handleTextAreaChange: function() {
    var username = React.findDOMNode(this.refs.usernameField).value;
    React.findDOMNode(this.refs.profilePathExample).innerHTML = username;
    this.validateUsername(username)
  },

  handleSubmitButtonClick: function() {
    var username = React.findDOMNode(this.refs.usernameField).value;
    var homeInstitutionEmail = React.findDOMNode(this.refs.homeInstitutionEmailField).value;
    var exchangeInstitution = React.findDOMNode(this.refs.exchangeInstitutionField).value;

    if (username === "") {
      return;
    } else {
      $.ajax({
        url: "/users/" + this.props.user_id,
        type: "PUT",
        data: { user: { username: username, 
                        email: homeInstitutionEmail } },
        success: function(response) {
          window.location.href = "/users/" + response
        }.bind(this)
      });
    }
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <br />
          <h3>Complete your profile</h3>
          <h5><span>Your profile URL: exchangehunt.com/users/</span><span ref="profilePathExample"></span></h5>
          <h6><span className="red-text hide" ref="blankUsernameMessage">Username cannot be blank.</span></h6>
          <h6><span className="red-text hide" ref="usernameTakenMessage">Username in use, please choose another username.</span></h6>
          <h6><span className="red-text hide" ref="invalidCharactersMessage">Username can only contain alphanumeric characters and underscore: A-Z 0-9 _</span></h6>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_prefix" type="text" className="validate" onChange={this.handleTextAreaChange} ref="usernameField"></input>
                <label htmlFor="icon_prefix">Username</label>
              </div>
            </div>
          </form>
            </div>
        <div className="row">
          <h5 className="inline">Enter your home institution email</h5>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">home</i>
                <label htmlFor="icon_prefix">Home Institution Email</label>
                <input id="icon_prefix" type="text" className="validate" ref="homeInstitutionEmailField"></input>
                <h5><span>Your home institution: </span><span ref="homeInstitutionName"></span></h5>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <h5 className="inline">Select your exchange institution</h5>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">school</i>
                <label htmlFor="icon_prefix">Exchange Institution</label>
                <input id="icon_prefix" type="text" className="validate" ref="exchangeInstitutionField"></input>
              </div>
            </div>
          </form>
        </div>
          <div className="row">
          <button className="btn waves-effect waves-light btn-large disabled"
            ref="createUsernameButton"
            type="submit"
            onClick={this.handleSubmitButtonClick}><i className="material-icons left">send</i>Create</button>
        </div>
      </div>
    );
  }

});

module.exports = UsernameCreationForm;
