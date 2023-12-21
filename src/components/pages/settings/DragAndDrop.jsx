import React from 'react';
import './vsdfv.css';

const CreateReport = () => {
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  function dragDrop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  }

  return (
    <div>
      <div className="gfg">GeeksforGeeks</div>
      <p>Image Drag and Drop in boxes</p>
      <div
        className="div1"
        onDrop={(event) => dragDrop(event)}
        onDragOver={(event) => allowDrop(event)}
      >

      </div>
      <br />
      <div
        className="div1"
        onDrop={(event) => dragDrop(event)}
        onDragOver={(event) => allowDrop(event)}
      >
        <img
          id="drag1"
          src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/Geek_logi_-low_res.png"
          draggable
          onDragStart={(event) => dragStart(event)}
          width="220"
          height="70"
        />
      </div>
    </div>
  );
};

export default CreateReport;
