import React, { useEffect, useState } from "react";
import NoteList from "./components/List/NotesList";
import GetPreview from "./components/GetPreview/GetPreview";
import AddNote from "./components/AddNote/AddNote";
import Form from "./components/Layout/Form";
import Alert from "./components/Layout/Alert";
import "./App.css";

function App() {
  const [notes, setNote] = useState([]);
  const [title, setTilte] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [validationError, setValidationError] = useState([]);

  // validation
  useEffect(() => {
    if (validationError.length !== 0) {
      setTimeout(() => {
        setValidationError([]);
      }, 3000);
    }
  });

  const validate = () => {
    const validtaion = [];
    let passed = true;
    if (!title) {
      validtaion.push("Please Enter Note Title");
      passed = false;
    }

    if (!content) {
      validtaion.push("Please Enter Note Content");
      passed = false;
    }
    setValidationError(validtaion);
    return passed;
  };

  // save datad to LocalStorage
  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNote(JSON.parse(localStorage.getItem("notes")));
    } else {
      localStorage.setItem("notes", JSON.stringify([]));
    }
  }, []);

  const saveNoteToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // go to Add note page
  const AddNotePageHandler = () => {
    setCreating(true);
  };

  // selected notes
  const selectedNoteHandler = (noteId) => {
    setSelectedNote(noteId);
  };

  // save notes
  const SaveNoteHandler = () => {
    if (!validate()) return;
    const note = {
      id: new Date(),
      title: title,
      content: content,
    };
    const updateNotes = [...notes, note];
    saveNoteToLocalStorage("notes", updateNotes);
    setNote(updateNotes);
    setCreating(false);
    setSelectedNote(note.id);
    setTilte("");
    setContent("");
  };

  // delete notes
  const deleteNotehandler = () => {
    const UpdateNotes = [...notes];
    const noteIndex = UpdateNotes.findIndex((ele) => ele.id === selectedNote);
    notes.splice(noteIndex, 1);
    saveNoteToLocalStorage("notes", notes);
    setNote(notes);
    setSelectedNote(null);
  };

  // go to edite page
  const setEditingPage = () => {
    const note = notes.find((ele) => ele.id === selectedNote);
    setEditing(true);
    setTilte(note.title);
    setContent(note.content);
  };

  // update notes
  const updateNoteHandler = () => {
    if (!validate()) return;
    const UpdateNotes = [...notes];
    const noteIndex = UpdateNotes.findIndex((ele) => ele.id === selectedNote);
    UpdateNotes[noteIndex] = {
      id: selectedNote,
      title: title,
      content: content,
    };
    saveNoteToLocalStorage("notes", UpdateNotes);
    setNote(UpdateNotes);
    setEditing(false);
    setTilte("");
    setContent("");
  };

  return (
    <React.Fragment>
      <h1 className="Header">Note App</h1>
      <div className="App">
        <div className="App-container">
          <NoteList
            AddNotePageHandler={AddNotePageHandler}
            selectedNote={selectedNote}
            notes={notes}
            noteSelect={selectedNoteHandler}
          />
          {creating ? (
            <AddNote>
              <Form
                FormTitle="Add New Note"
                title={title}
                content={content}
                titlteChange={(e) => setTilte(e)}
                ContentChange={(e) => setContent(e)}
                submitText="save"
                submitClick={SaveNoteHandler}
              />
            </AddNote>
          ) : (
            <GetPreview
              selectedNote={selectedNote}
              notes={notes}
              deleteNote={deleteNotehandler}
              setEditing={setEditingPage}
              editing={editing}
            >
              <Form
                FormTitle="Edite Note"
                title={title}
                content={content}
                titlteChange={(e) => setTilte(e)}
                ContentChange={(e) => setContent(e)}
                submitText="Edite"
                submitClick={updateNoteHandler}
              />
            </GetPreview>
          )}
          {validationError.length !== 0 && (
            <Alert validationMessage={validationError} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
