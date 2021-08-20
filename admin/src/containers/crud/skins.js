import React, { Component } from "react";
import { Table, Button, Input, Alert } from "antd";
import { connect } from "react-redux";
import { deleteBeak, getComb, updateBeak, addComb} from "../../actions/crud/skinsAttributes";
import Modal from "antd/lib/modal/Modal";
//import Alert from "../../components/alert/alert";

class SkinsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isDeleted: false,
      isUpdated: false,
      isNewAdded:false,
      modalVisible: false,
      modalTitle: "",
      newBeak: "",
      updateId: "",
      updateText: "",
      modalBtn: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getComb());
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
      modalTitle: "Add New Skin",
      modalBtn: "Add",
      modalVisible: true,
      //addModalOpen: true
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
    if (this.state.isDeleted || this.state.isNewAdded || this.state.isUpdated)
      if (this.props.isDeleted || this.props.isUpdated || this.props.isNewAdded) {
        //console.log('thisssssssssssssssssssss', this.state.isNewAdded)
        await this.props.dispatch(getComb());
        this.setState({
          isDeleted: false,
          isUpdated: false,
          isNewAdded: false,
          //alertMsg: ''
        });
      }
  }

  handleOk = () => {
    //console.log(this.state)
    if (this.state.modalTitle==="Update Name") {
      this.setState({
        modalVisible: false,
        updateText:this.state.updateText,
        isUpdated:true,
      });
      //console.log(this.state.isUpdated)
      const newdata={
        id:this.state.updateId,
        newtext:this.state.updateText
      }
      this.props.dispatch(updateBeak(newdata.id, newdata.newtext));
    }
    else if(this.state.modalTitle==="Add New Skin"){
      
      this.setState({
        modalVisible: false,
        newBeak:this.state.newBeak,
        isNewAdded:true
      });
      const newdata={
        newtext:this.state.newBeak
      }
      this.props.dispatch(addComb(newdata.newtext));
    }else{
      this.setState({
        modalVisible: false
    });
    }
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  componentWillReceiveProps(nextProps) {
      //console.log(nextProps)
    this.setState({
      dataSource: nextProps.skin,
      alertMsg: nextProps.alertMsg
    });
    return 1;
  }
  textChange = (e)=>{
    if(this.state.modalTitle==="Update Name"){
      this.setState({
        updateText: e.target.value,
      });
    }else if(this.state.modalTitle==="Add New Skin"){
       this.setState({
         newBeak: e.target.value,
       });
     }
  }

//   textChange2 = (e)=>{
//       this.setState({
//         newBeak: e.target.value
//       });
//   }

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
         //console.log(record);
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
          {/* <Input placeholder="Basic usage" onChange={this.state.modalTitle==="Update Name"? e=>this.textChange(e): e=>this.textChange2(e)} name='name' value={this.state.upModalOpen? this.state.updateText : this.state.newBeak} /> */}
          <Input placeholder="Basic usage" onChange={e=>this.textChange(e)} name='name' value={this.state.modalTitle==="Update Name"? this.state.updateText : this.state.newBeak} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.attribute)
  //console.log('Here is the state of Comb.....', state.attribute);
  return {
    skin: state.attribute.skin,
    isDeleted: state.attribute.beakDeleteStatus,
    isUpdated: state.attribute.skinUpdateStatus,
    isNewAdded: state.attribute.newSkinAdded,
    alertMsg: state.attribute.alertMsg, 
    isError : state.attribute.isError     
  };
}
export default connect(mapStateToProps)(SkinsContainer);
