import React from 'react';
const RowComponent = (props) => {
    return(<tr>
        <td>{props.data.name}</td>
        <td>{props.data.transaction.name}</td>
        <td>{props.data.transaction.amount}</td>
        <td>{props.data.transaction.timestamp}</td>
      </tr>);
}

export default RowComponent;