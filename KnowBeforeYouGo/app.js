
class App extends React.Component {
    state = {
        baseURL: 'https://restcountries.eu/rest/v2/name/',
        country:[],
        searchURL:'',
        countryName:'',
        modal:false
    }


    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleErrors(response) {
      if (!response.ok) throw new Error(response.error);
      return response;
    }

  handleSubmit = (event) => {
      event.preventDefault()
      this.setState({
          searchURL: this.state.baseURL + this.state.countryName + '?fullText=true'
      }, () => {
                  fetch(this.state.searchURL).then((response) => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        throw new Error('Something went wrong');
                      }
                    })
                    .then((json) => {
                      console.log(json)
                      console.log("inside then");
                      this.setState({
                        country: json,
                        countryName: this.state.countryName
                      });
                    })
                    .catch((error) => {
                      console.log(error)
                    });
                })//end of state
    }//end of handlesubmit

  reset(){
  console.log("reset");
  this.setState({countryName: '',
                 country:[]
                 });
  }


    render() {
      const cname = (this.state.country.map(cname => (cname.name)));
      const capital = (this.state.country.map(capital => (capital.capital)));
      const region = (this.state.country.map(reg => (reg.region)));
      const subreg = (this.state.country.map(subreg => (subreg.subregion)));
      const lang = this.state.country.map((country) => country.languages[0].name);
      const currency = this.state.country.map((country) => country.currencies[0].name);
      const flag = this.state.country.map((country) => country.flag);

      console.log("inside render");
      console.log(cname);
        return (
            <div>
            <button className="aboutButton" onClick={e => this.modalOpen(e)}>About the App!</button>

            <h1>Know Before You Go!!</h1>
            <form onSubmit={this.handleSubmit}>
                    <label htmlFor='country'>Country Name </label>
                    <input className="textbox"
                        id='countryName'
                        type='text'
                        value={this.state.countryName}
                        onChange={this.handleChange}
                    /><br /><br />
                    <input className="submitbutton"
                        type='submit'
                        value='Click Here!'
                    />
                    <input className="submitbutton2"
                        type='submit'
                        value='Reset Here!'
                        onClick={() => this.reset()}
                    />
                </form>
                 <CountryInfo cname={cname} capital={capital} reg={region} subreg={subreg} lang={lang} curr={currency} />
                 <DisplayFlag flag={flag} />
            </div>
        )
    }
}
class CountryInfo extends React.Component {
    render() {
      const styles = {color:'rgb(179, 20, 20)'}
      console.log("inside countryinfo");
        return (
            <div className="cnc">
                <h3><span style={styles}>Country: </span>{this.props.cname}</h3>
                <h3><span style={styles}>Capital: </span>{this.props.capital}</h3>
                <h3><span style={styles}>Region: </span>{this.props.reg}</h3>
                <h3><span style={styles}>Subregion: </span>{this.props.subreg}</h3>
                <h3><span style={styles}>Language: </span>{this.props.lang}</h3>
                <h3><span style={styles}>Currency: </span>{this.props.curr}</h3>
            </div>
        )
    }
}

class DisplayFlag extends React.Component {
  render(){
    return(
      <div className="flagdisplay">
      {(this.props.flag != "") ? <img src={this.props.flag} alt="new" width="200" height="100"/> : null }
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
    document.querySelector('.container')
)

// {(this.props.flag != "") ? <img src={this.props.flag} alt="new" width="200" height="100"/> : null }
