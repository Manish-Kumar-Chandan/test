import React from 'react';
import MessageContainer from '../../containers/message_container';

const Message = (props) => {
  return (
    <div>
      <MessageContainer {...props}/>
    </div>
  );
};

export default Message;