var InstitutionApp = React.createClass({
  componentDidMount: function() {
    var url = "/institutions/" + this.props.institution_id + ".json"
    $.get(url, function(response) {
      this.updateInstitutionObject(response);
    }.bind(this));

    function initialize() {
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: new google.maps.LatLng(1.2956, 103.7767),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  },

  getInitialState: function() {
    return {
      institution: {}
    };
  },

  updateInstitutionObject: function(institution) {
    this.setState({
      institution: institution
    }, function() {
      this.updateView();
    }.bind(this));
  },

  updateView: function() {
    $(React.findDOMNode(this.refs.loadingWrapper)).addClass("hide");
    $(React.findDOMNode(this.refs.wrapper)).removeClass("hide");
    this.forceUpdate();
    $(document).ready(function(){
      $('.collapsible').collapsible();
      $('.parallax').parallax();
      $('ul.tabs').tabs();
    });
  },

  renderInstitutionImageBanner: function() {
    if (this.state.institution.facebook_img_url != "") {
      return (
        <div id="index-banner" className="parallax-container">
          <div className="row">
            <div className="col s12">
              <div className="parallax">
                <img src={this.state.institution.facebook_img_url} alt={this.state.institution.name}></img>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },

  renderFBLike: function() {
    if (this.state.institution.facebook_pid != "") {
      return (
        <div className="row">
          <div className="col s12">
            <div className="fb-like left institution-fb-like-share" data-href={this.state.institution.facebook_pid} data-layout="standard" data-width="300" data-action="like" data-show-faces="true"></div>
          </div>
        </div>
      );
    }
  },

  renderMembersSection: function() {
    if (this.props.is_signed_in) {
      return (
        <div className="section">
          <div className="row">
            <div className="col s11">
              <h5 className="avenir-55 primary-text-color deep-orange-text">MEMBERS</h5>
              <InstitutionUsersApp institution={this.state.institution} userId={this.props.current_user_id} username={this.props.username} isExchanging={this.props.is_on_exchange} />
            </div>
          </div>
        </div>
      );
    }
  },

  render: function() {
    var institutionURL = "https://exchangehunt.io/institutions/" + this.state.institution.id;
    return (
      <div>
        <div ref="loadingWrapper">
          Loading..
        </div>
        <div ref="wrapper" className="hide">
          <div className="section">
            <div className="container">

              {this.renderInstitutionImageBanner()}

              <div className="row">
                <div className="col s12">
                  <h3 className="avenir-65 primary-text-color deep-orange-text">
                    {this.state.institution.name}
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="institution-left-content col s12 m8">
                  <div className="row">
                    <div className="col s11">
                      <h5 className="avenir-55 primary-text-color deep-orange-text">INFORMATION</h5>
                      <ul className="collapsible" data-collapsible="accordion">
                       <li>
                         <div className="collapsible-header"><i className="material-icons">place</i>Location
                           <span className="secondary-content"><i className="material-icons">expand_more</i></span>
                         </div>
                         <div className="collapsible-body"><p>{this.state.institution.state}, {this.state.institution.country}</p></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons">language</i>Primary language
                           <span className="secondary-content"><i className="material-icons">expand_more</i></span>
                         </div>
                         <div className="collapsible-body"><p>{this.state.institution.language}</p></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons">info_outline</i>Description
                           <span className="secondary-content"><i className="material-icons">expand_more</i></span>
                         </div>
                         <div className="collapsible-body"><p>{this.state.institution.extract}</p></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons">public</i>Facebook
                           <span className="secondary-content"><i className="material-icons">expand_more</i></span>
                         </div>
                         <div className="collapsible-body">
                          <p>
                            <a href={this.state.institution.facebook_pid}>
                              {this.state.institution.facebook_pid}
                            </a>
                          </p>
                        </div>
                       </li>
                     </ul>
                    </div>
                  </div>

                  <div className="section">
                    <div className="row">
                      <div className="col s11">
                        <h5 className="avenir-55 primary-text-color deep-orange-text">SHOUTOUT</h5>
                        <div className="fb-comments" data-href={institutionURL} data-numposts="8" data-width="100%"></div>
                      </div>
                    </div>
                  </div>

                  {this.renderMembersSection()}
                </div>


                <div className="institution-right-content col s12 m4">
                  <div className="row">
                    <div className="col s12">
                      <h5 className="avenir-55 primary-text-color deep-orange-text">RECENT ACTIVITY</h5>
                      <RecentlyActivity institution={this.state.institution} />
                    </div>
                  </div>

                  {this.renderFBLike()}

                  <div className="row">
                    <div className="col s12">
                      <div className="fb-share-button" data-href={institutionURL} data-layout="button_count"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h5 className="avenir-55 primary-text-color deep-orange-text">INSTITUTIONS NEARBY</h5>
                </div>
              </div>
              <div className="row">
                <div id="map"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

var RecentlyActivity = React.createClass({

  getInitialState: function() {
    return {
      recentlyJoinedUsers: []
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.institution.id == undefined && this.props.institution.id) {
      this.getRecentlyJoined();
    }
  },

  getRecentlyJoined: function() {
    var url = "/institutions/" + this.props.institution.id + "/recently_joined.json"
    $.get(url, function(response) {
      this.setState({ recentlyJoinedUsers: response });
      this.forceUpdate();
    }.bind(this));
  },

  generateList: function(users) {
    if (users.length === 0) {
      return <li className="collection-item">None :(</li>
    }
    var list = users.map(function(user){
      var messageUrl = "/messages/new?to=" + user.id;
      var userProfileUrl = "/users/" + user.username;
      return(
        <li className="collection-item avatar" key={user.id}>
          <a href={userProfileUrl}>
            <img src={user.image_url} className="circle responsive-img" alt="User's profile image" />
            <span className="title">{user.first_name} {user.last_name}</span>
          </a>
          <p>has joined</p>
          <a href={messageUrl} className="secondary-content"><i className="material-icons">email</i></a>
        </li>
      )
    }.bind(this));
    return list;
  },

  render: function() {
    var list = this.generateList(this.state.recentlyJoinedUsers);
    return(
      <div className="row">
        <div className="col s12">
          <ul className="collection">
            {list}
          </ul>
        </div>
      </div>
    )
  }
});

var HomeUsers = React.createClass({

  getInitialState: function() {
    return {
      homeUsers: []
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.institutionId == undefined && this.props.institutionId) {
      this.getHomeUsers();
    }
  },

  getHomeUsers: function() {
    var url = "/institutions/" + this.props.institutionId + "/home_users.json"
    $.get(url, function(response) {
      this.setState({ homeUsers: response });
      this.forceUpdate();
    }.bind(this));
  },

  generateList: function(users) {
    if (users.length === 0) {
      return <li className="collection-item">None :(</li>
    }
    var list = users.map(function(user){
      var messageUrl = "/messages/new?to=" + user.id;
      var userProfileUrl = "/users/" + user.username;
      var userVerifiedIcon = "";

      if (user.home_institution_confirmed) {
        userVerifiedIcon = "verified_user";
      }

      return(
        <li className="collection-item avatar" key={user.id}>
          <a href={userProfileUrl}><img src={user.image_url} className="circle responsive-img" alt="User's profile image" />
          <span className="title">{user.first_name} {user.last_name}</span></a>
          <p>{user.course}</p>
          <p className="secondary-content"><i className='material-icons verified-status'>{userVerifiedIcon}</i> <a href={messageUrl} className="secondary-content-addons"><i className="material-icons">email</i></a></p>
        </li>
      )
    }.bind(this));
    return list;
  },

  render: function() {
    var list = this.generateList(this.state.homeUsers);
    return(
      <div className="row">
        <div className="col s12">
          <ul className="collection">
            {list}
          </ul>
        </div>
      </div>
    )
  }
});

var ExchangeUsers = React.createClass({

  getInitialState: function() {
    return {
      exchangeUsers: []
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.institutionId == undefined && this.props.institutionId) {
      this.getExchangeUsers();
    }
  },

  getExchangeUsers: function() {
    var url = "/institutions/" + this.props.institutionId + "/exchange_users.json"
    $.get(url, function(response) {
      this.setState({ exchangeUsers: response });
      this.forceUpdate();
    }.bind(this));
  },

  generateList: function(users) {
    if (users.length === 0) {
      return <li className="collection-item">None :(</li>;
    }

    var list = users.map(function(user){
      var userVerifiedIcon = "";

      if (user.exchange_institution_confirmed) {
        userVerifiedIcon = "verified_user";
      }

      var messageUrl = "/messages/new?to=" + user.id;
      var userProfileUrl = "/users/" + user.username;
      return(
        <li className="collection-item avatar" key={user.id}>
          <a href={userProfileUrl}><img src={user.image_url} className="circle responsive-img" alt="User's profile image" />
          <span className="title">{user.first_name} {user.last_name}</span></a>
          <p>{user.course}</p>
          <p className="secondary-content"><i className='material-icons'>{userVerifiedIcon}</i> <a href={messageUrl} className="secondary-content-addons"><i className="material-icons">email</i></a></p>
        </li>
      )
    }.bind(this));
    return list;
  },

  render: function() {
    var list = this.generateList(this.state.exchangeUsers);
    return(
      <div className="row">
        <div className="col s12">
          <ul className="collection">
            {list}
          </ul>
        </div>
      </div>
    )
  }
});

var ExchangeHereButton = React.createClass({
  getInitialState: function() {
    return {
      isConnected: true
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.institutionId == undefined && this.props.institutionId) {
      this.getExchangeUsers();
    }
  },

  getExchangeUsers: function() {
    var url = "/institutions/" + this.props.institutionId + "/connections/" + this.props.userId + ".json";
    $.get(url, function(response) {
      this.setState({ isConnected: response });
    }.bind(this));
  },

  render: function() {
    var editProfileUrl = "/users/" + this.props.username + "/edit/";

    if (this.state.isConnected == false && !this.props.isExchanging) {
      return(
        <div className="row center">
          <div className="col s12">
            <a href={editProfileUrl} className="waves-effect waves-light btn primary-color" id="main-signup-button">Currently exchanging here?</a>
          </div>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }
});

var InstitutionUsersApp = React.createClass({
  componentDidMount: function() {
    this.updateView();
  },

  updateView: function() {
    $(React.findDOMNode(this.refs.loadingWrapper)).addClass("hide")
    $(React.findDOMNode(this.refs.wrapper)).removeClass("hide")
    $(React.findDOMNode(this.refs.homeStudentsTab)).addClass("active")
    this.forceUpdate();
  },


  render: function() {
    return (
      <div>
        <div ref="loadingWrapper">
          Loading..
        </div>
        <div ref="wrapper" className="hide">

          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s6"><a href="#home_students" ref="homeStudentsTab">HOME</a></li>
                <li className="tab col s6"><a href="#exchange_students">EXCHANGE</a></li>
              </ul>
            </div>
            <div id="home_students" className="col s12"><HomeUsers institutionId={this.props.institution.id} /></div>
            <div id="exchange_students" className="col s12"><ExchangeUsers institutionId={this.props.institution.id} /></div>
          </div>

          <div className="section">
            <div id="exchange_here_button"><ExchangeHereButton institutionId={this.props.institution.id} userId={this.props.userId} username={this.props.username} isExchanging={this.props.isExchanging} /></div>
          </div>

        </div>
      </div>
    );
  }

});

module.exports = InstitutionApp;
