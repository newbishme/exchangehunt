var UsernameCreationForm = React.createClass({

  getInitialState: function() {
    return {
      username: ""
    };
  },

  componentDidMount: function() {
    console.log(this.props.user);
  },

  handleTextAreaChange: function() {
    var username = React.findDOMNode(this.refs.usernameField).value;
    React.findDOMNode(this.refs.profilePathExample).innerHTML = username;
    console.log(username);
  },

  handleSubmitButtonClick: function() {
    var username = React.findDOMNode(this.refs.usernameField).value;
    if (username === "") {
      return;
    } else {
      $.ajax({
        url: "/users/" + this.props.user_id,
        type: "PUT",
        data: { user: { username: username } },
        success: function(response) {
          window.location.href = "/users/" + response
        }.bind(this)
      });
    }
  },

  render: function() {
    return (
      <div className="row">
        <br />
        <h3>Choose your username</h3>
        <h5><span>Your profile URL: exchangehunt.com/users/</span><span ref="profilePathExample"></span></h5>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="icon_prefix2"
                className="materialize-textarea"
                onChange={this.handleTextAreaChange}
                ref="usernameField"></textarea>
              <label htmlFor="icon_prefix2">Username</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light btn-large"
            type="submit"
            onClick={this.handleSubmitButtonClick}>Submit</button>
        </form>
      </div>
    );
  }

});

module.exports = UsernameCreationForm;
