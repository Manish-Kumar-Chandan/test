import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  Typography,
  Tag,
  notification,
  Drawer,
  Modal,
  Input,
} from "antd";
import {
  fetchSurveys,
  deleteSurvey,
  changeSurveyStatus,
  distribute,
  // sendReportLink,
  refundAmount,
} from "../actions/survey";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import moment from "moment-js"
const { Text, Title } = Typography;
const { confirm } = Modal;
class SurveyContainer extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchSurveys());
    this.state = {
      items: false,
      visible: false,
      data: null,
      searchText: "",
      searchedColumn: "",
      load: false,
      translated: "",
      translatedFrom: "",
      loading: false,
    };
  }

  deleteSurvey(id) {
    let that = this;
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "Be careful on performing this action",
      onOk() {
        that.props.dispatch(deleteSurvey(id));
      },
      onCancel() {
        return;
      },
    });
  }

  disableSurvey(id) {
    let that = this;
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "Be careful on performing this action",
      onOk() {
        const type = "0";
        if (confirm) {
          that.props.dispatch(changeSurveyStatus(id, type));
        }
      },
      onCancel() {
        return;
      },
    });
  }

  enableSurvey(id) {
    let that = this;
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "Be careful on performing this action",
      onOk() {
        const type = "1";
        if (confirm) {
          that.props.dispatch(changeSurveyStatus(id, type));
        }
      },
      onCancel() {
        return;
      },
    });
  }

  declineSurvey(id) {
    let that = this;
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "Be careful on performing this action",
      onOk() {
        const type = "2";
        if (confirm) {
          that.props.dispatch(changeSurveyStatus(id, type));
        }
      },
      onCancel() {
        return;
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    // console.log(props);
    if (props.surveyList.deleteSurvey) {
      if (props.surveyList.deleteSurvey.response === true) {
        window.location.reload();
      }
    }
    if (props.surveyList.surveyStatus) {
      if (props.surveyList.surveyStatus.Attributes) {
        window.location.reload();
      }
      if (props.surveyList.surveyStatus.response) {
        window.location.reload();
      }
    }
    if (props.surveyList.ditribute) {
      // console.log(props.surveyList)
      if (props.surveyList.ditribute.response) {
        window.location.reload();
      }
    }
    return null;
  }

  openInNewTab(url) {
    window.open(url, "_blank");
  }

  refundAmount(record) {
    let amount = prompt(
      "Please enter Refund amount you want to send to survey user"
    );
    if (!amount) {
      notification.error({
        message: "Please enter some amount to refund",
        placement: "bottomRight",
      });
      return;
    }
    this.setState({
      load: true,
    });

    const data = {
      paymentId: record.paymentToken.paymentID,
      curr: record.paymentToken.currency,
      id: record.id,
      amount,
    };

    this.props.dispatch(refundAmount(data));
  }
  distribute(id, userId) {
    let that = this;
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "Be careful on performing this action",
      onOk() {
        // that.props.dispatch(sendReportLink(id,userId));
        that.props.dispatch(distribute(id, userId));

      },
      onCancel() {
        return;
      },
    });
  }

  showDrawer = async (data) => {
    // console.log(data.surveyText)
    this.setState({loading: true})
    // const response = await axios.post("/translate", {text: data.surveyText });
    this.setState({
      translated: "response.data.translated",
      translatedFrom: "response.data.from",
      visible: true,
      data: data,
      loading: false
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      return (
        record[dataIndex] &&
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      );
    },

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text && text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  renderDetailReportSettings = () => {
    if(this.state.data.report){
      if(this.state.data.report.detailReport === "true"){
       return <> {this.state.data.report && parseFloat(this.state.data.report.reportAmount) + parseFloat(this.state.data.paymentToken.amount)} </>
      }else {
        return <> {this.state.data.paymentToken.amount} </>
      }
    }else {
      return <> {this.state.data.paymentToken.amount} </>
    }
  }

  render() {
    if (!this.props.surveyList.survey) {
      return <div className="loader">Loader</div>;
    }
    if(this.state.loading){
      return <div className="loader">Loader</div>;
    }
    const list = this.props.surveyList.survey.list;

    const columns = [
      {
        title: "Survey",
        dataIndex: "surveyText",
        key: "surveyText",
        ...this.getColumnSearchProps("surveyText"),

        render: (text, record) => {
          return (
            <>
              {record.surveyText.substring(0, 50)}...
              <Button
                size="small"
                type="link"
                onClick={() => this.showDrawer(record)}
              >
                View
              </Button>
            </>
          );
        },

      },
      {
        title: "DATE",
        dataIndex: "addedOn",
        key: "addedOn",
        render: (text) => {
          const d = new Date(text);
          const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
            d
          );
          const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
            d
          );
          const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
            d
          );
          const day = new Intl.DateTimeFormat("en", {
            weekday: "short",
          }).format(d);
          return <>{`${day} ${da} ${mo} ${ye}`}</>;
        },
      },
      {
        title: "STATUS",
        key: "days",
        filters: [
          {
            text: 'Distribute Amount',
            value: '1',
          },
          {
            text: 'Not Active',
            value: '0',
          },
          {
            text: 'Amount Distributed',
            value: '3',
          },
        ],
        onFilter: (value, record) => record.surveyStatus.indexOf(value) === 0,
        render: (text, record) => {
          // console.log(record);
          const surveyStatus = record.surveyStatus;
          const days = record.days;
          return (
            <>
              {surveyStatus === "2" && <Text type="danger"> Rejected </Text>}
              {surveyStatus === "4" && <Text type="danger"> Refunded </Text>}
              {surveyStatus === "1" && days >= 1 && (
                <Button
                  type="danger"
                  onClick={() => this.distribute(record.id, record.userId)}
                >
                  Distribute Amount
                </Button>
              )}
              {surveyStatus === "1" && days === 0 && (
                <Text type="warning">Active</Text>
              )}

              {surveyStatus === "3" && (
                <Text type="danger"> Amount Distributed </Text>
              )}

              {surveyStatus === "0" && <Text type=""> Not Active </Text>}
            </>
          );
        },

        // ...this.getColumnSearchProps("surveyStatus"),
      },
      {
        title: "ACTION",
        key: "action",
        render: (text, record) => {
          return (
            <>
              {record.surveyStatus === "1" && (
                <Button
                  onClick={() => this.disableSurvey(record.id)}
                  type="primary"
                >
                  Disable
                </Button>
              )}

              {record.surveyStatus === "0" && (
                <Button
                  onClick={() => this.enableSurvey(record.id)}
                  type="default"
                >
                  Enable
                </Button>
              )}

              {record.surveyStatus === "2" ? (
                <>
                  <Text type="danger"> Rejected </Text>
                  <Button
                    loading={this.state.load}
                    onClick={() => this.refundAmount(record)}
                    type="ghost"
                  >
                    Refund
                  </Button>
                </>
              ) : (
                <>
                  {record.surveyStatus === "4" ? null : (
                    <Button
                      onClick={() => this.declineSurvey(record.id)}
                      type="default"
                      style={{ marginLeft: 10 }}
                    >
                      Reject
                    </Button>
                  )}
                </>
              )}

              <Button
                onClick={() => this.deleteSurvey(record.id)}
                style={{ marginLeft: 10 }}
                type="danger"
              >
                Delete
              </Button>

              <Link
                style={{ marginLeft: 10 }}
                to={{
                  pathname: `/surveyMessages/${record.userId}`,
                  state: {
                    id: record.id,
                  },
                }}
              >
                Message
              </Link>

              {/* <Link  to={} >  </Link> */}
              {record.flag === "1" && (
                <Tag
                  style={{ backgroundColor: "#52c41a", marginLeft: 10 }}
                  color="volcano"
                >
                  Chat
                </Tag>
              )}
            </>
          );
        },
      },
    ];
    return (
      <div className="right-section">
        <Table
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey="id"
          dataSource={list}
        />
        {this.state.data && (
          <Drawer
            title="Survey Description"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            width={500}
          >
            <strong>Original Text: </strong><p>{this.state.data.surveyText}</p>

            <strong>Translated Text: </strong><p>{this.state.translated}</p>

            <p> <b>From: </b> {this.state.translatedFrom} </p>

            <hr />
            <Title level={4}>Filters</Title>
            <div className="filterSection">
              <span className="filterLabel">Country: </span>
              <span className="filterValue">
                {this.state.data.filters.country}
              </span>
            </div>
            <div className="filterSection">
              <span className="filterLabel">State: </span>
              <span className="filterValue">
                {this.state.data.filters.state}
              </span>
            </div>
            <div className="filterSection">
              <span className="filterLabel">Gender: </span>
              <span className="filterValue">
                {this.state.data.filters.gender}
              </span>
            </div>
            <div className="filterSection">
              <span className="filterLabel">Nationality: </span>
              <span className="filterValue">
                {this.state.data.filters.nationality}
              </span>
            </div>
            <div className="filterSection">
              <span className="filterLabel">City: </span>
              <span className="filterValue">
                {this.state.data.filters.city}
              </span>
            </div>
            <div className="filterSection">
              <span className="filterLabel">Age Range: </span>
              <span className="filterValue">{this.state.data.filters.age}</span>
            </div>

            <hr />
            <Title level={4}>Payment Info:</Title>

            <div className="paymentSection">
              <span className="paymentLabel">Added by: </span>
              <span className="paymentValue">
                {this.state.data.email ? this.state.data.email : "-" }
              </span>
            </div>

            <div className="paymentSection">
              <span className="paymentLabel">Distributional Amount: </span>
              <span className="paymentValue">
                {parseFloat(this.state.data.paymentToken.amount)/2}
              </span>
            </div>

            <div className="paymentSection">
              <span className="paymentLabel">Currency: </span>
              <span className="paymentValue">
                {this.state.data.paymentToken.currency}
              </span>
            </div>

            <div className="paymentSection">
              <span className="paymentLabel">Payment Id (mollie): </span>
              <span className="paymentValue">
                {this.state.data.paymentToken.paymentID}
              </span>
            </div>

            <div className="paymentSection">
              <span className="paymentLabel">Total Amount: </span>
              <span className="paymentValue">
               {this.renderDetailReportSettings()}
              </span>
            </div>

            <hr />
            <Title level={4}>Additional Info:</Title>

            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Language: </span>
              <span className="additionalInfoValue">
                {this.state.data.lang}
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Days Passed: </span>
              <span className="additionalInfoValue">
                {this.state.data.days}
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Submission Date: </span>
              <span className="additionalInfoValue">
                 {/* GMT{new Date(this.state.data.addedOn).toString().split("GMT")[1].split("(")[0]}  */}
                {moment(this.state.data.addedOn).format("YYYY-MM-DD hh:mm:ss")}
                {/* {new Date(this.state.data.addedOn).toDateString()} */}
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">TimeZone: </span>
              <span className="additionalInfoValue">
              {this.state.data.timezone && this.state.data.timezone}
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Activated Date: </span>
              <span className="additionalInfoValue">                
                {this.state.data.activatedTime != "" ?  <> {moment(this.state.data.activatedTime).format("YYYY-MM-DD hh:mm:ss")} </>: "Survey not Activated yet"}
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Total Participations: </span>
              <span className="additionalInfoValue">
                {this.state.data.participations}
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Earnings / user: </span>
              <span className="additionalInfoValue">
                {this.state.data.earning}
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Asked for CSV Report: </span>
              <span className="additionalInfoValue">
                  <strong> {this.state.data.report && this.state.data.report.detailReport === 'true' ?  'Yes' : 'No'} </strong>
              </span>
            </div>
            <div className="additionalInfoSection">
              <span className="additionalInfoLabel">Added Platform</span>
              <span className="additionalInfoValue">
                  <strong> {this.state.data.via} </strong>
              </span>
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    surveyList: state.survey,
  };
}
export default connect(mapStateToProps)(SurveyContainer);
