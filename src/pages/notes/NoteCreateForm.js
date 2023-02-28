import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";

export default function NoteCreateForm(props) {
  const { property, setNotes, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/notes/", {
        content,
        property,
      });
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: [data, ...prevNotes.results],
      }));
      setContent("");
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
          <Link className="mr-2" to={`/profiles/${profile_id}`}>
            <Avatar height={50} src={profileImage} />
          </Link>
          <Form.Control
            rows={2}
            as="textarea"
            value={content}
            onChange={handleChange}
            placeholder="Note to self..."
          />
        </InputGroup>
      </Form.Group>
      <div className="align-self-end">
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          disabled={!content.trim()}
          type="submit"
        >
          Leave Note
        </button>
      </div>
    </Form>
  );
}
