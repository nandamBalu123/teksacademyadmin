let myObject = { oldKey: 'value1', key2: 'value2' };

// Change the name of the key from 'oldKey' to 'newKey'
myObject.newKey = myObject.oldKey;
delete myObject.oldKey;

console.log(myObject);

let myObject = { oldKey: 'value1', key2: 'value2' };

// Change the name of the key from 'oldKey' to 'newKey'
myObject = { ...myObject, newKey: myObject.oldKey };
delete myObject.oldKey;

console.log(myObject);

import React, { useEffect, useState } from 'react';

const CreateReport = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    console.log('inputValues', inputValues);
  }, [inputValues]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (dimension, event) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dimension]: event.target.value,
    }));
  };

  const handleAddDimension = () => {
    const dimensionKey = `dimension${Object.keys(inputValues).length + 1}`;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dimensionKey]: '',
    }));
  };

  const handleDeleteDimension = (dimension) => {
    const newInputValues = { ...inputValues };
    delete newInputValues[dimension];
    setInputValues(newInputValues);
  };

  const handleMoveDimension = (dimension, direction) => {
    const dimensionsArray = Object.keys(inputValues);
    const index = dimensionsArray.indexOf(dimension);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < dimensionsArray.length) {
      const newInputValues = { ...inputValues };
      // Swap the dimensions
      [dimensionsArray[index], dimensionsArray[newIndex]] = [dimensionsArray[newIndex], dimensionsArray[index]];
      setInputValues(newInputValues);
    }
  };

  return (
    <div>
      <label htmlFor="dimensionSelect">Select Dimension:</label>
      <select id="dimensionSelect" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select Dimension</option>
        <option value="oneDimensional">One Dimensional</option>
        <option value="multiDimensional">Multi Dimensional</option>
      </select>

      {selectedOption === 'oneDimensional' && (
        <div>
          <label htmlFor="oneDimensionalInput">Enter One Dimensional Value:</label>
          <input
            type="text"
            id="oneDimensionalInput"
            value={inputValues.dimension1 || ''}
            onChange={(event) => handleInputChange('dimension1', event)}
          />
        </div>
      )}

      {selectedOption === 'multiDimensional' && (
        <div>
          <p>Multi Dimensional Inputs:</p>
          {Object.keys(inputValues).map((dimension, index) => (
            <div key={dimension}>
              <label htmlFor={`multiDimensionalInput${index}`}>{`Dimension ${index + 1}:`}</label>
              <input
                type="text"
                id={`multiDimensionalInput${index}`}
                value={inputValues[dimension]}
                onChange={(event) => handleInputChange(dimension, event)}
              />
             
              <button type="button" onClick={() => handleMoveDimension(dimension, 'up')}>
                Move Up
              </button>
              <button type="button" onClick={() => handleMoveDimension(dimension, 'down')}>
                Move Down
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddDimension}>
            Add Dimension
          </button>
        </div>
      )}

      {selectedOption && (
        <p>You selected: {selectedOption === 'oneDimensional' ? 'One Dimensional' : 'Multi Dimensional'}</p>
      )}
    </div>
  );
};

export default CreateReport;













// import React, { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// const DraggableInput = ({ id, index, value, onInputChange, onDrop, onDelete }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: 'DIMENSION',
//     item: { id, index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, drop] = useDrop({
//     accept: 'DIMENSION',
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         onDrop(draggedItem.index, index);
//         draggedItem.index = index;
//       }
//     },
//   });

//   return (
//     <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       <label htmlFor={`multiDimensionalInput${index}`}>{`Dimension ${index + 1}:`}</label>
//       <input
//         type="text"
//         id={`multiDimensionalInput${index}`}
//         value={value}
//         onChange={(event) => onInputChange(index, event)}
//       />
//       {onDelete && (
//         <button type="button" onClick={() => onDelete(index)}>
//           Delete
//         </button>
//       )}
//     </div>
//   );
// };

// const CreateReport = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [inputValues, setInputValues] = useState(['']);

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleInputChange = (index, event) => {
//     const newInputValues = [...inputValues];
//     newInputValues[index] = event.target.value;
//     setInputValues(newInputValues);
//   };

//   const handleAddDimension = () => {
//     setInputValues([...inputValues, '']);
//   };

//   const handleDeleteDimension = (index) => {
//     if (inputValues.length > 1) {
//       const newInputValues = [...inputValues];
//       newInputValues.splice(index, 1);
//       setInputValues(newInputValues);
//     }
//   };

//   const handleDropDimension = (dragIndex, dropIndex) => {
//     const newInputValues = [...inputValues];
//     const [removed] = newInputValues.splice(dragIndex, 1);
//     newInputValues.splice(dropIndex, 0, removed);
//     setInputValues(newInputValues);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <label htmlFor="dimensionSelect">Select Dimension:</label>
//         <select id="dimensionSelect" value={selectedOption} onChange={handleSelectChange}>
//           <option value="">Select Dimension</option>
//           <option value="oneDimensional">One Dimensional</option>
//           <option value="multiDimensional">Multi Dimensional</option>
//         </select>

//         {selectedOption === 'oneDimensional' && (
//           <div>
//             <label htmlFor="oneDimensionalInput">Enter One Dimensional Value:</label>
//             <input
//               type="text"
//               id="oneDimensionalInput"
//               value={inputValues[0]}
//               onChange={(event) => handleInputChange(0, event)}
//             />
//           </div>
//         )}

//         {selectedOption === 'multiDimensional' && (
//           <div>
//             <p>Multi Dimensional Inputs:</p>
//             {inputValues.map((value, index) => (
//               <DraggableInput
//                 key={index}
//                 id={`dimension-${index}`}
//                 index={index}
//                 value={value}
//                 onInputChange={handleInputChange}
//                 onDrop={handleDropDimension}
//                 onDelete={() => handleDeleteDimension(index)}
//               />
//             ))}
//             <button type="button" onClick={handleAddDimension}>
//               Add Dimension
//             </button>
//           </div>
//         )}

//         {selectedOption && (
//           <p>You selected: {selectedOption === 'oneDimensional' ? 'One Dimensional' : 'Multi Dimensional'}</p>
//         )}
//       </div>
//     </DndProvider>
//   );
// };

// export default CreateReport;
