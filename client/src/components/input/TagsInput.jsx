import { faAdd, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'

const TagsInput = ({tags, setTags}) => {

    const [inputValue, setInputValue] = useState('');

    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = ()=>{
        if(inputValue.trim() != ""){
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default action of the Enter key (like form submission)
            addNewTag();
        }
    };
    const handleRemoveTags = (tagToRemove)=>{
        setTags(tags.filter((tags)=>tags != tagToRemove));
    }
  return (
    <>
        {tags?.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap mt-2'>
                {tags.map((tags, index)=> (
                    <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded '>
                        # {tags}
                        <button onClick={()=>{handleRemoveTags(tags)}}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </span>
                ))}
            </div>
        )}
        <div className='flex items-center gap-4 mt-3'>
            <input type="text" className="w-50 px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none" 
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            value={inputValue}
            />

            <button className='w-8 h-8 flex items-center justify-center border rounded border-blue-700 hover:bg-blue-700'
            onClick={()=>{
                addNewTag();
            }}
            >
                <FontAwesomeIcon icon={faAdd} className='text-2xl text-blue-500 hover:text-white'/>
            </button>
        </div>
    </>
  )
}

export default TagsInput