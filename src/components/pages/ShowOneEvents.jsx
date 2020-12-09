import React, { Component } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import jwt from "jwt-decode";
import moment from "moment";
import qs from "qs";
import "./ShowOneEvents.scss";
class ShowOneEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      users: [],
    };
  }

  componentDidMount() {
    const routeParams = this.props.match.params;

    if (this.props.location.state && this.props.location.state.event) {
      this.setState({
        event: this.props.location.state.event,
      });
      return;
    }

    this.getSingleEvent(routeParams.id);
    this.confirmUser();
    this.confirmLogin();
  }

  getSingleEvent(id) {
    console.log(id);
    axios
      .get(`http://localhost:5000/api/v1/events/${id}`)
      .then((response) => {
        this.setState({
          event: response.data,
          users: response.data.people_joining,
        });
        console.log(this.state.users.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  confirmUser() {
    // get token
    const token = this.props.cookies.get("token");
    try {
      const decodedToken = jwt(token);
      if (decodedToken.username === this.state.event.hosted_by) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  confirmLogin() {
    const token = this.props.cookies.get("token");

    try {
      const decodedToken = jwt(token);
      if (!decodedToken) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  handleDelete(e) {
    console.log("click");
    e.preventDefault();
    const routeParams = this.props.match.params;
    const id = routeParams.id;

    axios
      .delete(`http://localhost:5000/api/v1/events/${id}`)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/events");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  joinRSVP(e) {
    e.preventDefault();
    const token = this.props.cookies.get("token");
    const decodedToken = jwt(token);
    const routeParams = this.props.match.params;
    const id = routeParams.id;

    let currentUserList = this.state.event.people_joining;
    if (currentUserList.includes(decodedToken.username) === false) {
      this.setState({
        event: { ...this.state.event, people_joining: decodedToken.username },
      });
      console.log(this.state.event);
      const config = {
        headers: {
          auth_token: token,
        },
      };

      axios
        .patch(
          `http://localhost:5000/api/v1/events/${id}/join`,
          qs.stringify({
            people_joining: decodedToken.username,
          }),
          config
        )
        .then((response) => {
          this.props.history.push(`/events`)
          this.props.history.push(`/events/${id}`)
          console.log(this.state);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Added before");
    }
  }

  leaveRSVP(e) {
    e.preventDefault();
    const token = this.props.cookies.get("token");
    const decodedToken = jwt(token);
    const routeParams = this.props.match.params;
    const id = routeParams.id;

    let currentUserList = this.state.event.people_joining;
    if (currentUserList.includes(decodedToken.username) === true) {
      this.setState({
        event: { ...this.state.event, people_joining: decodedToken.username },
      });
      console.log(this.state.event);
      const config = {
        headers: {
          auth_token: token,
        },
      };

      axios
        .patch(
          `http://localhost:5000/api/v1/events/${id}/remove`,
          qs.stringify({
            people_joining: decodedToken.username,
          }),
          config
        )
        .then((response) => {
          this.props.history.push(`/events`)
          this.props.history.push(`/events/${id}`)
          console.log(this.state);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("cannot removed anymore");
    }
  }

  render() {
    return (
      <div id='show-single-event' className='background_image' style={{ backgroundImage: "url(/img/partypic2.jpg)" }}>
        <div className='container'>
          {this.state.event ? (
            <div class="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-6xl h-64">
              <div class="w-full md:w-1/4 px-4 py-4 bg-white rounded-lg">
                <div className="bg-gray-400 dark:bg-gray-800 rounded-lg lg:w-12/12 py-5 block h-full shadow-inner">
                  <div className="text-center tracking-wide">
                    <div className="font-bold text-4xl ">{moment(this.state.event.hosted_date).format("DD")}</div>
                    <div className="font-normal text-2xl">{moment(this.state.event.hosted_date).format("MMM")}</div>
                    <div className="font-bold text-4xl">{moment(this.state.event.hosted_date).format("YYYY")}</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-3/4 px-4 py-4 bg-white rounded-lg'>

                <div className='flex items-center'>
                  <h2 className="text-xl text-gray-800 font-medium mr-auto">Event Details</h2>
                  <p class="text-gray-800 font-semibold tracking-tighter">No of current participants :
                  <i class="text-gray-600"> </i>{this.state.users.length}</p>
                </div>
                <p>Contact us at : {this.state.event.contact_number}</p>
                <p>join us at : {this.state.event.location}</p>
                <hr />

                <p class="text-sm text-gray-700 mt-4">
                  {this.state.event.description}
                </p>

                <hr />
                <div class="flex items-center justify-end mt-4 top-auto">

                  {this.confirmUser() ? (
                    <button onClick={(e) => { this.handleDelete(e); }} type='button' className='bg-red-200 text-red-600 px-2 py-2 rounded-md mr-auto'>
                      Delete Event
                    </button>
                  ) : (
                      ""
                    )}
                  {this.confirmLogin() ? (
                    <button onClick={(e) => { this.joinRSVP(e); }} type='button' className='bg-green-200 text-blue-600 px-2 py-2 rounded-md mr-2'>
                      Join Event
                    </button>
                  ) : (
                      ""
                    )}
                  {this.confirmLogin() ? (
                    <button
                      onClick={(e) => {
                        this.leaveRSVP(e);
                      }}
                      type='button'
                      className='bg-blue-600 text-gray-200 px-2 py-2 rounded-md'
                    >
                      Leave Event
                    </button>
                  ) : (
                      ""
                    )}

                </div>


                {this.state.users.length > 0 ? (
                  this.state.users.map((people) => {
                    return <p>Participants : {people}</p>;
                  })
                ) : (
                    <p className="content-center">no participants</p>
                  )}


              </div>
            </div>
          ) : (
              ""
            )}
        </div>
      </div>
    );
  }
}

export default withRouter(withCookies(ShowOneEvents));
