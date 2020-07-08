import React, { Component } from "react";
import io from "socket.io-client";
import {
  Row,
  Col,
  Container,
  Card,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import "../styles/ChatBox.css";

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    //how are we getting the name of the room? incoming props from parent component?
    this.socket = io("localhost:5000");

    this.socket.on(`MESSAGE_TO_${this.props.room}`, function (data) {
      // console.log("RECEIVING SOCKET ROOM", this.props.room)
      addMessage(data);
    });

    const addMessage = (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    //this should eventually be this.props.username bc it's coming from redux store.
    // the message will be in the local state?
    // this.sendMessage = (ev) => {
    //   ev.preventDefault();
    //   this.socket.emit("SEND_MESSAGE", {
    //     author: this.state.username,
    //     message: this.state.message,
    //   });
    //   this.setState({ message: "" });
    // };
    this.test = (event) => {
      event.preventDefault();
      console.log("Button connected");
      console.log("STATE MESSAGE", this.state.message)
      this.socket.emit('test', {
        testMessage: this.state.message,
        room: this.props.room
    });
    }
  }



  render() {
    return (
      <Container className="m-0 p-0">
        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <Card className="m-0 p-0 shadow-sm">
              <Card.Body>
                <Card.Title>JavaScript Convo</Card.Title>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message) => {
                    return (
                      <div>
                        {message.username}: {message.text}
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
              <div className="card-footer">
                {/* <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/> */}

                <InputGroup>
                  <FormControl
                    placeholder="Message"
                    aria-label="Message"
                    aria-describedby="basic-addon2"
                    value={this.state.message}
                    onChange={event => {this.setState({message: event.target.value})}}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      onClick={this.test}>
                      Send
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChatBox;
