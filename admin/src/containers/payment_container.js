import React, { Component } from "react";
import { Input, Row, Col, notification, Typography, Button, Card } from "antd";
import { connect } from "react-redux";
import {
  fetchPaymentSettings,
  updatePaymentSettings,
} from "../actions/payment";

const { Title, Text } = Typography;

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      amount: "",
      currency: "",
      reportAmount: "",
      loader: true,
    };
    this.props.dispatch(fetchPaymentSettings());
    this.updatePayment = this.updatePayment.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const paymentLength = Object.keys(props.payment).length;
    if (props.payment.paymentUpdate) {
      window.location.reload();
    }
    if (paymentLength) {
      return {
        loader: false,
        id: props.payment.payment.id,
        amount: props.payment.payment.amount,
        currency: props.payment.payment.currency,
        reportAmount: props.payment.payment.reportAmount,
      };
    }

    return null;
  }

  updatePayment(e) {
    e.preventDefault();
    const amount = e.target.elements.amount.value;
    const currency = e.target.elements.currency.value;
    if (!amount || !currency) {
      notification.error({
        message: "Please enter Amount and Currency both",
        placement: "bottomRight",
      });
      return;
    }
    const updateData = {
      id: this.state.id,
      amount,
      currency,
      reportAmount: this.state.reportAmount,
    };
    this.props.dispatch(updatePaymentSettings(updateData));
  }
  updateGetReport(e) {
    e.preventDefault();
    const amount = e.target.elements.reportAmount.value;
    if (!amount) {
      notification.error({
        message: "Please enter Amount for Report Payment",
        placement: "bottomRight",
      });
      return;
    }
    const updateData = {
      id: this.state.id,
      amount: this.state.amount,
      currency: this.state.currency,
      reportAmount: amount,
    };
    this.props.dispatch(updatePaymentSettings(updateData));
  }

  onAmountChange(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  render() {
    const { loader, amount, currency, reportAmount } = this.state;
    if (loader) {
      return <div className="loader"></div>;
    }
    return (
      <div className="right-section"> 
      <Card style={{minHeight: "70vh"}}>
        <Row>
          <Col sm={6} xl={6} md={6}>
            <Title level={3}>Survey Amount</Title>
            <form onSubmit={(e) => this.updatePayment(e)}>
              <label className="my-label">Payment Amount</label>
              <Input
                type="text"
                placeholder="Enter new Amount for single survey"
                name="amount"
              />
              <Text type="secondary">Current Amount: {amount}</Text>
              <br />
              <label className="my-label">Currency</label>
              <Input
                type="text"
                placeholder="Enter new Currency for single survey"
                name="currency"
              />
              <Text type="secondary">Current Currency: {currency}</Text>
              <br />
              <Button htmlType="submit" type="primary">
                Update
              </Button>
            </form>
          </Col>
          <Col offset={8} sm={6} xl={6} md={6}>
            <Title level={3}>Payment Amount</Title>
            <form onSubmit={(e) => this.updateGetReport(e)}>
              <label className="my-label">Amount</label>
              <Input
                type="text"
                placeholder="Enter new Amount for Get Report"
                name="reportAmount"
              />
              <Text type="secondary">Current Amount: {reportAmount}</Text>
              <br />
              <Button htmlType="submit" type="primary">
                Update
              </Button>
            </form>
          </Col>
        </Row>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    payment: state.payment,
  };
}

export default connect(mapStateToProps)(PaymentContainer);
