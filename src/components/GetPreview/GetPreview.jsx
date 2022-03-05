import React from "react";
import Message from "../Layout/Message";
import "./index.css";

const GetPreview = ({
  selectedNote,
  notes,
  deleteNote,
  setEditing,
  editing,
  children,
}) => {
  if (notes.length === 0) {
    return <Message>There is No Notes ...!</Message>;
  }

  if (!selectedNote) {
    return <Message>Please Select Note</Message>;
  }

  const note = notes.find((ele) => ele.id === selectedNote);
  const display = (
    <div className="content">
      <h2>{note.title}</h2>
      <pre>{note.content}</pre>
    </div>
  );

  return (
    <React.Fragment>
      {editing ? (
        children
      ) : (
        <div className="getPreview-container">
          {display}
          <div className="edit">
            <a href="#">
              <i className="fa fa-pencil-alt" onClick={setEditing} />
            </a>
            <a href="#">
              <i className="fa fa-trash" onClick={() => deleteNote()} />
            </a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default GetPreview;
