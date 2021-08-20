import React, { Component } from "react";
import { Table, Button, Input, Alert,  Form,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch, } from "antd";
import { connect } from "react-redux";
import { getBeak, getComb, getEye, getSkin, getStripe, getWattle, createChicken } from "../../actions/chicken/chicken_action"; 
import Modal from "antd/lib/modal/Modal";

class CreateChicken extends Component {
  constructor(props) {
    super(props);

    this.state = {

      beak: [],
      eye: [],
      wattle: [],
      skin: [],
      stripe: [],
      comb: [],
      name: "",
      breed:"",
      sltbeak: "",
      slteye: "",
      sltwattle: "",
      slttest:"",
      sltskin: "",
      sltstripe: "",
      sltcomb: "", 
    };
  }

  componentDidMount() {
    this.props.dispatch(getBeak());
    this.props.dispatch(getComb());
    this.props.dispatch(getWattle());
    this.props.dispatch(getEye());
    this.props.dispatch(getSkin());
    this.props.dispatch(getStripe());
  }

  async componentDidUpdate() {

    if (this.state.isDeleted || this.state.isNewAdded || this.state.isUpdated)
      if (this.props.isDeleted || this.props.isUpdated || this.props.isNewAdded) {
        this.setState({
          isDeleted: false,
          isUpdated: false,
          isNewAdded: false
        });
        //console.log('this is State', this.state)
      }
  }

  handleOk = () => {
    console.log('State..............', this.state)
    const {name, breed, sltbeak, sltcomb, slteye, sltwattle, sltskin, sltstripe}=this.state
    this.props.dispatch(createChicken(name, breed, sltbeak, sltcomb, slteye, sltwattle, sltskin, sltstripe));
    this.setState({
      name: "",
      breed:"",
      sltbeak: "",
      slteye: "",
      sltwattle: "",
      slttest:"",
      sltskin: "",
      sltstripe: "",
      sltcomb: "",
    })
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  BeakIsSelected(){
    alert('beak is selected')
  }

  componentWillReceiveProps(nextProps) {
    console.log('here is nextProps',nextProps)
    this.setState({
      beak: nextProps.beak,
      eye: nextProps.eye,
      wattle: nextProps.wattle,
      skin: nextProps.skin,
      stripe: nextProps.stripe,
      comb: nextProps.comb,
      alertMsg: nextProps.alertMsg,
    });
    return 1;
  }
  textChange = (e)=>{
      this.setState({
        [e.target.name]: e.target.value,
      });
  }

  setBeak = (value, event) => {
    this.setState({ sltbeak: value})    
  }
  setComb = (value, event) => {
    this.setState({ sltcomb: value})
  }
  setSkin = (value, event) => {
    this.setState({ sltskin: value})
  }
  setStripe = (value, event) => {
    this.setState({ sltstripe: value})
  }
  setEye = (value, event) => {
    this.setState({ slteye: value})
  }
  setWattle = (value, event) => {
    this.setState({ sltwattle: value})
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
         //console.log(record);
          return (
            <>
              <Button
                onClick='kl'
                style={{ marginLeft: 10 }}
                type="primary"
              >
                Update
              </Button>
              <Button
                onClick='kl'
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
    return (
      <div className="right-section">
        <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: 100,
        }}
        onValuesChange={100}
        size={100}
      >
        <Alert type='success' message='Chicken Created Successfuly' showIcon={true} style={this.props.isSuccess? { display: 'flex' }:{ display: 'none' }} />
        <Form.Item label="Create New Chicken" name="size">
        </Form.Item>
        <Form.Item label="Name">
          <Input placeholder="Enter Chicken Name" onChange={e=>this.textChange(e)} name="name" value={this.state.name} required/>
        </Form.Item>
        <Form.Item label="Breed">
          <Input placeholder="Enter Chicken Breed" onChange={e=>this.textChange(e)} name="breed" value={this.state.breed}/>
        </Form.Item>
        <Form.Item label="Beak">
          <Select key='1' defaultValue="Select Beak" onSelect={(value, event) => this.setBeak(value, event)}>
            {this.state.eye?this.state.beak.map(list =>(<Select.Option value={list._id}>{list.name}</Select.Option>)):''}
          </Select>
        </Form.Item>
        <Form.Item label="Eye">
          <Select key='2' defaultValue="Select Eye" onSelect={(value, event) => this.setEye(value, event)}>
            {this.state.eye?this.state.eye.map(list =>(<Select.Option value={list._id}>{list.name}</Select.Option>)):''}
          </Select>
        </Form.Item>
        <Form.Item label="Stripe">
          <Select key='3' defaultValue="Select Stripe" onSelect={(value, event) => this.setStripe(value, event)}>
            {this.state.stripe?this.state.stripe.map(list =>(<Select.Option value={list._id}>{list.name}</Select.Option>)):''}
          </Select>
        </Form.Item>
        <Form.Item label="Comb">
          <Select key='4' defaultValue="Select Comb" onSelect={(value, event) => this.setComb(value, event)}>
            {this.state.comb?this.state.comb.map(list =>(<Select.Option value={list._id}>{list.name}</Select.Option>)):''}
          </Select>
        </Form.Item>
        <Form.Item label="Wattle">
          <Select key='5' defaultValue="Select Wattle" onSelect={(value, event) => this.setWattle(value, event)}>
            {this.state.wattle?this.state.wattle.map(list =>(<Select.Option value={list._id}>{list.name}</Select.Option>)):''}
          </Select>
        </Form.Item>
        <Form.Item label="Skin">
          <Select key='6' defaultValue="Select Skin" onSelect={(value, event) => this.setSkin(value, event)}>
            {this.state.skin?this.state.skin.map(list =>(<Select.Option value={list._id}>{list.name}</Select.Option>)):''}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleOk} style={{marginLeft:200}}>Add</Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state.attribute)
  console.log('Here is the state of Comb.....', state.chicken);
  return {
    beak: state.chicken.beak,
    eye: state.chicken.eye,
    wattle: state.chicken.wattle,
    skin: state.chicken.skin,
    stripe: state.chicken.stripe,
    comb: state.chicken.comb,
    isError: state.chicken.isError, 
    isSuccess: state.chicken.success    
  };
}
export default connect(mapStateToProps)(CreateChicken);
