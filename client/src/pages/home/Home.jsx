import React, { useEffect, useState } from "react";
import NoteCard from "../../components/card/NoteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import AddEditPage from "./AddEditPage";
import ReactModal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import EmptyCard from "../../components/card/EmptyCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [note, setNote] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: {},
  });
  const { searchResults, isSearch } = useOutletContext();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const getAllNotes = async () => {
    try {
      const res = await axiosInstance.get("/api/get-all-notes/");

      if (res.data && res.data.note) {
        setNote(res.data.note);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  useEffect(() => {
    getAllNotes();
    return () => {};
  }, []);

  const toastMsg = (message) => {
    toast(message);
  };

  const handleDeleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axiosInstance.delete(`/api/delete-note/${noteId}`);

      if (res.data && !res.data.error) {
        getAllNotes();
        toastMsg("Note deleted Successfully");
      }
    } catch (error) {
      if (error.res && error.res.data && error.res.data.message) {
        console.log("An unexpected error occurred. Please try again");
      }
    }
  };

  const handlePinned = async (data) => {
    const noteId = data._id;

    try {
      const res = await axiosInstance.put(`/api/update-note-pinned/${noteId}`, {
        isPinned: !data.isPinned,
      });

      if (res.data && res.data.note) {
        toastMsg("Note updated Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  const displayedNotes = isSearch ? searchResults?.note || [] : note;

  return (
    <>
      <div className="p-4">
        {displayedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {displayedNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDeleteNote(item)}
                onPinnedNote={() => handlePinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>

      <button
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: {} })
        }
        className="w-16 h-16 items-center justify-center fixed right-10 bottom-10 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-800 transition-all ease-in-out duration-300"
      >
        <FontAwesomeIcon icon={faAdd} className="text-[32px] text-white" />
      </button>
      <ReactModal
        className="w-[94%] md:w-[40%] bg-white p-6 rounded m-auto"
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <AddEditPage
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: note,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={toastMsg}
        />
      </ReactModal>

      <ToastContainer />
    </>
  );
};

export default Home;
