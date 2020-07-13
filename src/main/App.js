import React from 'react';

import Routes from './routes'
import Navbar from '../components/navbar'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'

/* Returns JSX (javascript XML) format App component */
class App extends React.Component {

  render() {
    return(
      <>
        <Navbar />
        <div className="container">
            <Routes />
        </div>
      </>
    )
  }
}

/* Grant public access to other files */
export default App;
