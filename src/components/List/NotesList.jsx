import React from "react";
import "./index.css";
const NoteList = ({ AddNotePageHandler, selectedNote, notes, noteSelect }) => {
  return (
    <div className="NoteList">
      <ul>
        {notes.map((ele, idx) => {
          return (
            <li
              className={`${selectedNote === ele.id && "active"} `}
              key={idx}
              onClick={() => noteSelect(ele.id)}
            >
              {ele.title}
            </li>
          );
        })}
      </ul>
      <button className="add-btn" onClick={() => AddNotePageHandler()}>
        +
      </button>
    </div>
  );
};

export default NoteList;
