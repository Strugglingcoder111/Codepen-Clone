const TextareaEditor = ({ elObj, handleChange }) => {
  return (
    <textarea
      value={elObj.value}
      name={elObj.name}
      onChange={({ target }) => handleChange(target)}
      placeholder={elObj.placeholder}
    ></textarea>
  );
};

export default TextareaEditor;
