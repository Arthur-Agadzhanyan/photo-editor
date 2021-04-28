import React from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import HomePage from './pages/HomePage/Home'
import EditorPage from './pages/EditorPage/Editor'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomePage/>
        </Route>
        <Route exact path='/editor'>
          <EditorPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
