import React from "react";
import PaymentContainer from "../../containers/payment_container";

const Payment = (props) => {
  return (
    <div>
      <PaymentContainer {...props} />
    </div>
  );
};

export default Payment;
