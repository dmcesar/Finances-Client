import React from 'react';

import Routes from './routes'
import Navbar from '../components/navbar'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
