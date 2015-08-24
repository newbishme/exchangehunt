var SearchBar = React.createClass({

  componentDidMount: function() {
    var input = React.findDOMNode(this.refs.searchInputField);
  },

  render: function() {
    return (
      <div>
        <form className="col offset-s2 s8 offset-m2 m8">
          <div className="input-field" id="main-search-bar">
            <i className="material-icons prefix">search</i>
            <input type="text" className="validate" ref="searchInputField" ></input>
            <label htmlFor="searchText" id="search-bar-overlay" className="clickthrough">Search for a university</label>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = SearchBar
