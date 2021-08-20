import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import { fetchFeedbacks } from "../actions/feedback";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

class FeedbackContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
    };
    this.props.dispatch(fetchFeedbacks());
    this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
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
    if (!this.props.feedbacks.feedbacks) {
      return <div className="loader"></div>;
    }
    const dataSource = this.props.feedbacks.feedbacks.list;

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (text) => <>{text.substring(1, 5)}</>,
      },
      {
        title: "RATING",
        dataIndex: "rating",
        key: "rating",
        ...this.getColumnSearchProps("rating"),
      },
      {
        title: "TYPE",
        dataIndex: "type",
        key: "type",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "TEXT",
        dataIndex: "body",
        key: "body",
        ...this.getColumnSearchProps("body"),
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
    ];
    return (
      <div className="right-section">
        <Table
          pagination={{ pageSize: 5 }}
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    feedbacks: state.feedbacks,
  };
}

export default connect(mapStateToProps)(FeedbackContainer);
