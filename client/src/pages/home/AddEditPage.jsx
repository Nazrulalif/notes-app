import React, { useState } from "react";
import TagsInput from "../../components/input/TagsInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";

Modal.setAppElement("#root");
const AddEditPage = ({
  noteData,
  getAllNotes,
  onClose,
  type,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || "");
  const [error, setError] = useState("");

  const addNewNote = async () => {
    try {
      const res = await axiosInstance.post("/api/add-note", {
        title,
        content,
        tags,
      });

      if (res.data && res.data.note) {
        getAllNotes();
        onClose();
        showToastMessage("Note Added Successfully");
      }
    } catch (error) {
      if (error.res && error.res.data && error.res.data.message) {
        setError(error.res.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const res = await axiosInstance.put(`/api/edit-note/${noteId}`, {
        title,
        content,
        tags,
      });

      if (res.data && res.data.note) {
        getAllNotes();
        onClose();
        showToastMessage("Note updated Successfully");
      }
    } catch (error) {
      if (error.res && error.res.data && error.res.data.message) {
        setError(error.res.data.message);
      }
    }
  };

  const handleNote = async () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <>
      <button className="float-right mb-3" onClick={onClose}>
        <FontAwesomeIcon
          icon={faTimes}
          className="text-slate-400 hover:text-black text-lg"
        />
      </button>
      <div className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
            placeholder="Enter your Title"
            className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none"
            col="3"
            rows="4"
            value={content}
            onChange={({ target }) => {
              setContent(target.value);
            }}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-600"
          >
            Tags
          </label>
          <TagsInput tags={tags} setTags={setTags} />
        </div>
        {error && <p className="text-red-500 text-xs pb-3">{error}</p>}
        <button
          type="submit"
          onClick={handleNote}
          className="w-full px-3 py-2 text-white bg-primary rounded-lg"
        >
          {type === "edit" ? "Update" : "Add"}
        </button>
      </div>
    </>
  );
};

export default AddEditPage;
