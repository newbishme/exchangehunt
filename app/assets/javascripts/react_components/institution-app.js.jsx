var InstitutionApp = React.createClass({

  componentWillMount: function() {
    var url = "/institutions/" + this.props.institution_id + ".json"
    $.get(url, function(response) {
      this.updateInstitutionObject(response);
    }.bind(this));
  },

  componentDidMount: function() {
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
    console.log(this.state.institution);
    this.forceUpdate();
    this.loadDisqus();
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
                <div className="col">
                  <h3 className="avenir-65 primary-text-color deep-orange-text">
                    {this.state.institution.name}
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Location: {this.state.institution.state}, {this.state.institution.country}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Primary language: {this.state.institution.language}
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col s12 m8">
                  <h4 className="avenir-65 primary-text-color deep-orange-text">SHOUTOUT</h4>
                  <div id="disqus_thread"></div>
                </div>
                <div className="col s12 m4">
                  <h4 className="avenir-65 primary-text-color deep-orange-text">RECENTLY JOINED</h4>
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
            </div>
            <div className="row">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = InstitutionApp;
