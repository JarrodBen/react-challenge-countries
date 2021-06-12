import React from "react"
import "./styles/App.css"
import { Header } from './components/Header'
import { Home } from './components/MainPage'
import { Detail } from "./components/CountryDetails";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <section className="main-container">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:name" exact component={Detail} />
        </Switch>
    </section>
    </Router>
  );
}

export default App;
