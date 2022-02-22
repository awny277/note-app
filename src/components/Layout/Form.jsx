import React from "react";
import "./Layout.css";

const Form = ({
  FormTitle,
  title,
  content,
  titlteChange,
  ContentChange,
  submitClick,
  submitText,
}) => {
  return (
    <div className="form-section">
      <form>
        <h1>{FormTitle}</h1>
        <input
          type={"text"}
          className="title-input"
          placeholder="Enter Note Title"
          value={title}
          onChange={(e) => titlteChange(e.target.value)}
        />
        <textarea
          rows={10}
          className="content-input"
          placeholder="Enter Note Content"
          value={content}
          onChange={(e) => ContentChange(e.target.value)}
        />
        <a href="#" className="save-input" onClick={submitClick}>
          {" "}
          {submitText}
        </a>
      </form>
    </div>
  );
};

export default Form;
