import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import './UserProfile.scss'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            location: '',
            formUpdate: []
        }
    }

    componentDidMount() {
        // call UserProfile with the input
        this.autoFillForm()
    }

    handleLocationChange(e) {
        this.setState({
            location: e.target.value
        })
    }

    autoFillForm() {
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios.get('https://app-mrktplc-server.herokuapp.com/api/v1/users/profile', config)
            .then(response => {
                this.setState({
                    location: response.data[0].location
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleFormSubmission(e) {
        e.preventDefault()

        this.setState({
            formUpdate: []
        })

        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        // console.log(token)
        axios.patch('http://localhost:5000/api/v1/users/profile', qs.stringify({
            location: this.state.location
        }), config)
            .then(response => {
                console.log(response.data)
                this.setState({
                    formUpdate: "Location has been updated!"
                })
            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            location: '',
        })


    }

    render() {
        return (
            <div id="page-userProfile">
                <div className="container">
                    <div className="wrapper">

                        <div className="form-input">
                            <div className="row">
                                <div className="col-md-4 offset-md-4">

                                <div className="titleDiv">
                                    <p className="title">Update Location</p>
                                </div>


                                    <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                                        {/* <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" defaultValue={this.state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div> */}
                                        <div className="form-group">
                                            {/* <label className="font-weight-bold" htmlFor="location">Update Location</label> */}
                                            <select className="form-control" value={this.state.location} onChange={e => { this.handleLocationChange(e) }} id="location">
                                                <option>---Please Select---</option>
                                                <option>Ang Mo Kio</option>
                                                <option>Bedok</option>
                                                <option>Bishan</option>
                                                <option>Bukit Batok</option>
                                                <option>Bukit Merah</option>
                                                <option>Bukit Panjang</option>
                                                <option>Bukit Timah</option>
                                                <option>Central</option>
                                                <option>Choa Chu Kang</option>
                                                <option>Clementi</option>
                                                <option>Geylang</option>
                                                <option>Hougang</option>
                                                <option>Jurong East</option>
                                                <option>Jurong West</option>
                                                <option>Kallang / Whampoa</option>
                                                <option>Marine Parade</option>
                                                <option>Pasir Ris</option>
                                                <option>Punggol</option>
                                                <option>Queenstown</option>
                                                <option>Sembawang</option>
                                                <option>Sengkang</option>
                                                <option>Serangoon</option>
                                                <option>Tampines</option>
                                                <option>Toa Payoh</option>
                                                <option>Woodlands</option>
                                                <option>Yishun</option>
                                            </select>
                                        </div>
                                        {
                                            this.state.formUpdate !== '' ? (
                                                <div className="form-group text-center">
                                                    <p>{this.state.formUpdate}</p>
                                                </div>
                                            ) :
                                                ''
                                        }
                                        <button type="submit" className="btn" id="submit-btn">Update</button>
                                        
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default withRouter(withCookies(UserProfile))
