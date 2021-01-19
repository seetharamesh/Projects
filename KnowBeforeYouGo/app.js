//This App is developed to displayed any country details for the country name the user provides
//Get information about countries via a RESTful API
//Purpose: to know about the country before we go!!
//https://restcountries.eu/
//I am using the "Full Name" search

class App extends React.Component {
    state = {
        baseURL: 'https://restcountries.eu/rest/v2/name/',
        country:[],
        searchURL:'',
        countryName:'',
    }
//this method sets the state for the input field that user enters. countryname: this.state.countryname
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }
//this method is executed when form is submitted. It retrieves data and check for API errors
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

//resets the form and API data displayed
  reset(){
  console.log("reset");
  this.setState({countryName: '',
                 country:[]
                 });
  }
    //renders the form and gets the data from API and pass them as props to child component
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
                 <CountryInfo cname={cname} capital={capital} reg={region} subreg={subreg} lang={lang} curr={currency} flag={flag} />
            </div>
        )
    }
}
//child component that renders API data
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
                {(this.props.flag != "") ? <img src={this.props.flag} alt="new" width="200" height="100"/> : null }
            </div>
        )
    }
}
//the App is rendered int the reactDOM
ReactDOM.render(
    <App />,
    document.querySelector('.container')
)
