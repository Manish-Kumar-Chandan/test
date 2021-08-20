import React, { Component } from "react";
import { Table, Button, Input, Alert } from "antd";
import { connect } from "react-redux";
import { deleteBeak, getBeak, updateBeak, addBeak} from "../actions/attributes";
import Modal from "antd/lib/modal/Modal";

class UserContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      upModalOpen: false,
      addModalOpen: false,
      isDeleted: false,
      isUpdated: false,
      modalVisible: false,
      modalTitle: "",
      newBeak: "",
      updateId: "",
      updateText: "",
      modalBtn: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getBeak());
  }

  onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };

  updateAction(updateId, updateText) {
    // this.props.dispatch(updateBeak(updateId, updateText));
    //console.log(this.state)
    this.setState({
      updateId,
      updateText,
      modalTitle: "Update Name",
      modalBtn: "Update",
      modalVisible: true,
    });
    //console.log('Manish is here....',this.state)
  }

  addNewBeak(){
    this.setState({
      modalTitle: "Add New Beak",
      modalBtn: "Add",
      modalVisible: true,
    })
  }

  emptyModal() {
    this.setState({
      updateId: "",
      updateText: "",
      modalTitle: "",
      modalBtn: "",
      modalVisible: false,
    });
  }

  deleteAction(id) {
    this.props.dispatch(deleteBeak(id));
    this.setState({
      isDeleted: true,
    });
  }

  async componentDidUpdate() {
    if (this.state.isDeleted || this.state.isUpdated || this.state.isNewAdded)
      if (this.props.isDeleted || this.props.isUpdated || this.props.isNewAdded) {
        await this.props.dispatch(getBeak());
        console.log(this.state.isUpdated)
        this.setState({
          isDeleted: false,
          isUpdated: false,
          isNewAdded: false
        });
      }
  }

  handleOk = async() => {
    //console.log(this.state)
    if (this.state.modalTitle==="Update Name") {
      console.log(this.state.isUpdated)
      await this.props.dispatch(updateBeak(this.state.updateId, this.state.updateText));
      this.setState({
        modalVisible: false,
        updateText: this.state.updateText,
        isUpdated: true
      });
    }
    else if(this.state.modalTitle==="Add New Beak"){
      this.setState({
        modalVisible: false,
        newBeak:this.state.newBeak,
        isNewAdded:true
      });
      console.log(this.state.isNewAdded)
      const newdata={
        newtext:this.state.newBeak
      }
      return await this.props.dispatch(addBeak(newdata.newtext));
      //console.log('Add new model Request Made');
    }else{
      this.setState({
        modalVisible: false
    });
    }
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      upModalOpen: false,
      addModalOpen: false
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.beak,
    });
    return 1;
  }
  textChange = (e)=>{
    if(this.state.modalTitle==="Update Name"){
      this.setState({
        updateText: e.target.value,
      });
    }else if(this.state.modalTitle==="Add New Beak"){
       this.setState({
         newBeak: e.target.value,
       });
     }
  }

  textChange2 = (e)=>{
      this.setState({
        newBeak: e.target.value
      });
  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "ACTION",
        key: "action",
        render: (text, record) => {
         // console.log(record);
          return (
            <>
              <Button
                onClick={() => this.updateAction(record._id, record.name)}
                style={{ marginLeft: 10 }}
                type="primary"
              >
                Update
              </Button>
              <Button
                onClick={() => this.deleteAction(record._id)}
                style={{ marginLeft: 10 }}
                type="danger"
              >
                Delete
              </Button>
            </>
          );
        },
      },
    ];
    //console.log(this.props);
    return (
      <div className="right-section">
        <Alert type='error' message={this.props.alertMsg} showIcon={true} style={this.props.isError? { display: 'flex' }:{ display: 'none' }} />
        <Table dataSource={this.state.dataSource} columns={columns} /> <Button onClick={()=> this.addNewBeak()}>Add</Button>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          okText={this.modalBtn}
          onCancel={this.handleCancel}
        >
        <Input placeholder="Basic usage" onChange={e=>this.textChange(e)} name='name' value={this.state.modalTitle==="Update Name"? this.state.updateText : this.state.newBeak} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('Here is the state.....', state.attribute);
  return {
    beak: state.attribute.beak,
    isDeleted: state.attribute.beakDeleteStatus,
    isUpdated: state.attribute.beakUpdateStatus,
    isNewAdded: state.attribute.newBeakAdded,
    alertMsg: state.attribute.alertMsg,  
    isError: state.attribute.isError 
  };
}
export default connect(mapStateToProps)(UserContainer);
