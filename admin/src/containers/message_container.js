import React, { Component } from "react";
import { List, Input, Button } from "antd";
import { connect } from "react-redux";
import { sendMessage, getSurveyChat } from "../actions/message";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
const { TextArea } = Input;

class MesageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      showSpin: false,
      intervalId: ''
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    let intervalId = setInterval(this.timer, 10000);
    this.setState({intervalId: intervalId});
  }

  timer() {
    this.props.dispatch(getSurveyChat(this.props.location.state.id));
 }

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

  sendMessage() {
    const { newMessage } = this.state;
    if (newMessage.length < 5) {
      alert("Message is to short");
      return;
    }
    const id = this.props.location.state.id;
    const userId = this.props.match.params.userId;
    const by = "1";
    const username = "Admin";
    const data = {
      by: by,
      id: this.createNewId(18),
      msg: newMessage,
      read: "false",
      userId: userId,
      surveyId: id,
      username: username,
    };
    this.props.dispatch(sendMessage(data));
    this.setState({ showSpin: true });
  }

  createNewId(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.newMessage) {
      window.location.replace("/admin/list-surveys")
    }
    return null;
  }

  render() {
    if (!this.props.chat.message.chat) {
      return <div className="loader"></div>;
    }
    const data = this.props.chat.message.chat;
    return (
      <div className="right-section">
        <h3>Messages</h3>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<UserOutlined />}
                title={
                  <span>
                    {item.username === "Admin" ? "You" : item.username}
                  </span>
                }
                description={item.msg}
              />
            </List.Item>
          )}
        />

        <TextArea
          onChange={(e) => this.setState({ newMessage: e.target.value })}
          placeholder="Type new message...."
          rows={4}
        />

        {this.state.showSpin ? (
          <SyncOutlined spin />
        ) : (
          <Button
            style={{ marginTop: 10 }}
            onClick={this.sendMessage.bind(this)}
            type="primary"
          >
            Send now
          </Button>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    newMessage: state.message.newMessage,
    chat: state,
  };
}
export default connect(mapStateToProps)(MesageContainer);
