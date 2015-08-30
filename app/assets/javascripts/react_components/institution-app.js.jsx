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
      }
      var map = new google.maps.Map(mapCanvas, mapOptions)
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
    $(React.findDOMNode(this.refs.loadingWrapper)).addClass("hide")
    $(React.findDOMNode(this.refs.wrapper)).removeClass("hide")
    Materialize.updateTextFields();
    this.forceUpdate();
    this.loadDisqus();
    $('.collapsible').collapsible();
    $('.materialboxed').materialbox();
  },

  loadDisqus: function() {
    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = 'exchangehunt';

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  },

  render: function() {
    return (
      <div>
        <div ref="loadingWrapper">
          Loading..
        </div>
        <div ref="wrapper" className="hide">
          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <img className="materialboxed" width="100%" src={this.state.institution.facebook_img_url} data-caption={this.state.institution.name}></img>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h3 className="avenir-65 primary-text-color deep-orange-text">
                    {this.state.institution.name}
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="institution-left-content col s12 m8">
                  <div className="row">
                    <div className="col s11">
                      <h4 className="avenir-65 primary-text-color deep-orange-text">INFORMATION</h4>
                      <ul className="collapsible" data-collapsible="accordion">
                       <li>
                         <div className="collapsible-header"><i className="material-icons">place</i>Location</div>
                         <div className="collapsible-body"><p>{this.state.institution.state}, {this.state.institution.country}</p></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons">language</i>Primary language</div>
                         <div className="collapsible-body"><p>{this.state.institution.language}</p></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons">info_outline</i>Description</div>
                         <div className="collapsible-body"><p>{this.state.institution.extract}</p></div>
                       </li>
                       <li>
                         <div className="collapsible-header"><i className="material-icons">public</i>Facebook</div>
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
                  <div className="row">
                    <div className="col s11">
                      <h4 className="avenir-65 primary-text-color deep-orange-text">SHOUTOUT</h4>
                      <div id="disqus_thread"></div>
                    </div>
                  </div>
                </div>
                <div className="institution-right-content col s12 m4">
                  <h4 className="avenir-65 primary-text-color deep-orange-text">RECENTLY JOINED</h4>
                  <RecentlyJoined institution={this.state.institution} />
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h4 className="avenir-65 primary-text-color deep-orange-text">INSTITUTIONS NEARBY</h4>
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

var RecentlyJoined = React.createClass({

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
      return(
        <li className="collection-item avatar" key={user.id}>
          <img src={user.image_url} className="circle responsive-img" alt="User's profile image" />
          <span className="title">{user.first_name} {user.last_name}</span>
          <p>{user.course}</p>
          <a href="#!" className="secondary-content"><i className="material-icons">email</i></a>
        </li>
      )
    }.bind(this));
    return list;
  },

  render: function() {
    var list = this.generateList(this.state.recentlyJoinedUsers);
    return(
      <div className="row">
        <div className="col s10">
          <ul className="collection">
            {list}
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = InstitutionApp;
