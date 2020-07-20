import React from 'react'

import AuthService from '../app/service/auth-service'

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component {

    state = {

        signedUser: null,
        isAuthenticated: false
    };

    initSession = (user) => {

        AuthService.signUser(user);
        this.setState({ isAuthenticated: true, signedUser: user });
    }

    closeSession = () => {

        AuthService.signUserOut();
        this.setState({ isAuthenticated: false, signedUser: null });
    }

    render() {

        const context = {

          signedUser: this.state.signedUser,
          isAuthenticated: this.state.isAuthenticated,
          initSession: this.initSession,
          closeSession: this.closeSession  
        };

        return(
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticationProvider;