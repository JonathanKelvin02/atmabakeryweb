import React from 'react';

const PopupContent = ({ data }) => {
  console.log(data);

  return (
    <div>
      <h1>Oy</h1>
      <p>More content...</p>
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default PopupContent;