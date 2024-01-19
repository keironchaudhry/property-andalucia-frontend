import React, { useState } from "react";
import Media from "react-bootstrap/Media";

import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/moredropdown/MoreDropdown.js";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NoteEditForm from "./NoteEditForm";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

const Note = (props) => {
  const { id, owner, updated_at, content, setNotes } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notes/${id}/`);
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.filter((note) => note.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div>
      <Media>
        <Media.Body className="align-self-center ml-2">

          {/* User avatar + timestamp */}
          <div className="d-flex flex-row">
            <span className="pr-2 font-weight-bold">{owner}</span>
            <span className="pl-2">
              <u>{updated_at}</u>
            </span>
          </div>

          {/* Ternary condition : edit form or note content */}
          {showEditForm ? (
            <NoteEditForm
              id={id}
              content={content}
              setNotes={setNotes}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <div className="mt-2 mb-4 ml-1">
              <p>{content}</p>
            </div>
          )}
        </Media.Body>

        {/* Dropdown component */}
        {is_owner && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Note;
