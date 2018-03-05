import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Gryffindor from './gryffindor.js'
import Ravenclaw from './ravenclaw.js'
import Slytherin from './slytherin.js'
import Hufflepuff from './hufflepuff.js'
import config from './config';
// import Chart from './Chart';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: []
    }

 
  }


    render() {
      return (
        <div>
          
        </div>
      )
    }
}

class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      characters : [],
      army: 0,
    }
    this.characterBio = this.characterBio.bind(this);
    // this.addArmy = this.addArmy.bind(this);
  }
  componentDidMount() {
    axios.get("https://harrypotter.wikia.com/api/v1/Articles/List", {
      params: {
        expand: 1,
        category: "Wizards",
        limit: 40,
      }
    })
      .then((res) => {
          console.log(res);
        // this.setState({
        //   characters: data
        // });
      });  
    // axios.get(`${config.HPapiURL}`, {
    //   params: {
    //     key: config.HPapiKey,
    //     school: config.school,
    //   }
    // })
    //   .then(({ data }) => {

    //     this.setState({
    //       characters: data
    //     });
    //   });  
    // axios({
    //   method: 'GET',
    //   url: 'http://proxy.hackeryou.com',
    //   dataResponse: 'json',
    //   paramsSerializer: function (params) {
    //     return Qs.stringify(params, { arrayFormat: 'brackets' })
    //   },
    //   params: {
    //     reqUrl: 'https://en.wikipedia.org/w/api.php',
    //     params: {
    //       format: 'json',
    //       formatversion: '2',
    //       action: 'query',
    //       titles: 'Albert Einstein',
    //       prop: 'images'
    //     }
    //   }
    // })
    //   .then((res) => {
    //     console.log(res);
    //   }, rej => {
    //     console.log(rej);
    //   }
    // );
  }
  // addArmy(character) {
   
  // }
  characterBio(event) {
                
    let affiliation;

  if (event.dumbledoresArmy === true) {
    affiliation = (
      "Dumbledores Army"
    )

  } else if (event.deathEater === true){
    affiliation = (
      "Death Eater"
    )
  } else {
    affiliation = (
      "Unaffiliated"
    )}
    let characterBio;
    
    characterBio = (
      <div className="characterBio">
        <img className="frogCard" src="./chocolatefrogback.png" alt=""/>
        {/* remove back to see front */}
        <img className="portrait" src="./ginny.jpg" alt="" />
        {/* comment out character info when front showing */}
      <div className="characterInfo">
     
        <h6 className={event.house}>{event.house}</h6>

          <h6>{event.bloodStatus}</h6>
          <h6>{event.wand}</h6>

        <h6>{event.patronus}</h6>
        <h6>{affiliation}</h6> 
      </div>
        <h2 className="characterName" >{event.name}</h2>
      </div>
    )

    return characterBio;
  }

render() {
  return(
    <Router>
      <div className="main">
        <header>
          {/* <Link to="/">Home</Link> */}
          <div className="houseTabs">
            <div className="gryffindor"><Link to="/gryffindor">Gryffindor</Link></div>
            <div className="hufflepuff"> <Link to="/hufflepuff">Hufflepuff</Link></div>
            <div className="ravenclaw"><Link to="/ravenclaw">Ravenclaw</Link></div>
            <div className="slytherin"> <Link to="/slytherin">Slytherin</Link></div>
          </div>
          <h2>Sort by:</h2>
          <button onClick={this.sortByAff}>Affiliation</button>
        <button onClick={this.sortByAnces}>Wizarding Ancestry</button> */}
        </header>
        
        <Route path = "/" exact component={Home} />
        <Route path="/Chart" exact component={Chart} />
        <Route 
          path="/gryffindor" 
          render={(props) => {
            return <Gryffindor {...props} characters={this.state.characters} characterBio={this.characterBio} />
          }}
          />
        <Route
          path="/ravenclaw"
          render={(props) => {
            return <Ravenclaw {...props} characters={this.state.characters} characterBio={this.characterBio} />
          }}
        />
        <Route
          path="/hufflepuff"
          render={(props) => {
            return <Hufflepuff {...props} characters={this.state.characters} characterBio={this.characterBio} />
          }}
        />
        <Route
          path="/slytherin"
          render={(props) => {
            return <Slytherin {...props} characters={this.state.characters} characterBio={this.characterBio} />
          }}
        />
        <Home />
        {console.log(this.state.army)}
      </div>
    </Router>
  )
}
}

ReactDOM.render(<App />, document.getElementById('app'));
