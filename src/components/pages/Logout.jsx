import React from 'react'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'

class Logout extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    

    logout(e) {

        this.props.cookies.remove('token', {
            path: '/',
        })
    }

    render() {
        return(
            <div className="page-logout" token={this.state.token}>
                <div className="container">
                        <button type="submit" className="btn btn-primary" onClick={this.logout}>Logout</button>
                </div>
            </div>
        )
    }
}

export default withCookies(Logout)