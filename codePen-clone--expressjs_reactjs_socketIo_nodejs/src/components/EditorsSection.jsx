import TextareaEditor from "../hoc/TextareaEditor";

const editorsSection = ({ editorState, handleChange }) => {
  return (
    <div className="editorContainer">
      {[
        {
          value: editorState.html,
          name: "html",
          placeholder: "HTML",
        },
        {
          value: editorState.css,
          name: "css",
          placeholder: "CSS",
        },
        {
          value: editorState.js,
          name: "js",
          placeholder: "JS",
        },
      ].map((elObj, ind) => (
        <TextareaEditor key={ind} elObj={elObj} handleChange={handleChange} />
      ))}
    </div>
  );
};

export default editorsSection;
