import React from "react";
import { Media } from "react-bootstrap";

import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Note = (props) => {
  const { owner, updated_at, content } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          <span>{owner}</span>
          <span>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
        {is_owner && (
          <MoreDropdown
            handleEdit={() => {}}
            handleDelete={() => {}}
          />
        )}
      </Media>
    </div>
  );
};

export default Note;
