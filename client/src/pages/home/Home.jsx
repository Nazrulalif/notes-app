import React, {useState} from "react";
import NoteCard from "../../components/card/NoteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import AddEditPage from "./AddEditPage";
import ReactModal from "react-modal";
const Home = () => {
 
  const notes = [
    {
      title: 'lorem ipsum',
      date: '12/12/2021',
      content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, ante eget ultrices ultrices, ante odio aliquet mi, nec suscipit arcu nunc nec libero. Ut nec metus nec nunc.',
      tags: '#lorem #ipsum #dolor',
      isPinned: false
    },
  ];

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: {},
  });

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              title={note.title}
              date={note.date}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => console.log('edit')}
              onDelete={() => console.log('delete')}
              onPinnedNote={() => console.log('pinned')}
            />
          ))}
        </div>
      </div>

      <button
      onClick={() => setOpenAddEditModal({isShown: true, type: 'add', data: {}})} 
      className="w-16 h-16 items-center justify-center absolute right-10 bottom-10 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-800 transition-all ease-in-out duration-300">
        <FontAwesomeIcon icon={faAdd} className="text-[32px] text-white"/>
      </button>
      <ReactModal 
      className='w-[94%] md:w-[40%] bg-white p-6 rounded m-auto'
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          }
        }}
        >
        <AddEditPage
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={()=>{
          setOpenAddEditModal({
            isShown:false,
            type:'add',
            data:null
          })
        }} />
      </ReactModal>
    </>
  );
};

export default Home;
