import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Typography, Button, Input } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { fetchTransactions, paymentAction } from "../actions/transactions";

const { Text } = Typography;

class TransactionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
    };
    this.props.dispatch(fetchTransactions());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transUp) {
      if (nextProps.transUp.success) {
        window.location.reload();
      }
    }
    return true;
  }

  acceptPayment(id, userId, amount) {
    const data = {
      id,
      userId,
      amount,
      type: "accept",
    };
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      this.props.dispatch(paymentAction(data));
    }
  }
  declinePayment(id) {
    console.log(id);
  }

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

  render() {
    if (!this.props.transactions.transactions) {
      return <div className="loader">Loader</div>;
    }
    const data = this.props.transactions.transactions.list.Items;
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (text) => <>{text.substring(1, 5)}</>,
      },
      {
        title: "NAME",
        dataIndex: "username",
        key: "username",
        ...this.getColumnSearchProps("username"),
      },
      {
        title: "DATE",
        dataIndex: "addedOn",
        key: "addedOn",
        render: (text) => {
          const time = new Date(text).toDateString();
          return <>{time}</>;
        },
      },
      {
        title: "AMOUNT",
        dataIndex: "amount",
        key: "amount",
        ...this.getColumnSearchProps("amount"),
      },
      {
        title: "STATUS",
        key: "tstatus",
        render: (text, record) => {
          const tstatus = record.tstatus;
          return (
            <>
              {tstatus === 0 && <Text type="warning">Pending</Text>}
              {tstatus === 1 && <Text type="secondary">Payment Granted</Text>}
              {tstatus === 2 && <Text type="danger">Payment Declined</Text>}
            </>
          );
        },
      },
      {
        title: "ACTION",
        key: "action",
        render: (text, record) => {
          const status = record.tstatus;
          return (
            <div>
              {status === 0 ? (
                <>
                  <Button
                    onClick={() =>
                      this.acceptPayment(
                        record.id,
                        record.userId,
                        record.amount
                      )
                    }
                    type="primary"
                  >
                    Accept
                  </Button>
                  {/* <Button
                    onClick={() => this.declinePayment(record.id)}
                    style={{ marginLeft: 10 }}
                    type="danger"
                  >
                    Decline
                  </Button> */}
                </>
              ) : (
                "No action left"
              )}
            </div>
          );
        },
      },
    ];
    return (
      <div className="right-section"> 
        <Table
          pagination={{ pageSize: 7 }}
          columns={columns}
          rowKey="id"
          dataSource={data}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transaction,
    transUp: state.transaction.transactionUpdate,
  };
}

export default connect(mapStateToProps)(TransactionContainer);
