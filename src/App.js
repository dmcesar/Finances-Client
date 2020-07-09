import React from 'react';

import Login from './views/login'
import 'bootswatch/dist/flatly/bootstrap.css'
import './custom.css'

/* Returns JSX (javascript XML) format App component */
class App extends React.Component {

  render() {
    return(
      <div>
          <Login />
      </div>
    )
  }
}

/* Grant public access to other files */
export default App;
