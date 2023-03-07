import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

export default function NoteEditForm(props) {
  const { id, content, setNotes, setShowEditForm } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/notes/${id}/`, {
        content: formContent,
      });
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.map((note) => {
          return note.id === id
            ? {
                ...note,
                content: formContent.trim(),
                updated_at: "now",
              }
            : note;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      className="w-100 d-flex flex-column mt-2 pt-3 pb-3"
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <InputGroup>
          <Form.Control
            rows={2}
            as="textarea"
            value={formContent}
            onChange={handleChange}
            placeholder="Leave yourself a private note here. Don't worry, they can't be seen by anyone else."
          />
        </InputGroup>
      </Form.Group>
      <div className="align-self-end">
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          type="submit"
        >
          Save
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={() => setShowEditForm(false)}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
