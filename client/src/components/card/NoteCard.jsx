import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faThumbtack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinnedNote,
}) => {
  return (
    <>
      <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out duration-300">
        <div className="float-right">
          <FontAwesomeIcon
            icon={faThumbtack}
            className={`text-xl cursor-pointer  hover:text-blue-500 ${
              isPinned ? "text-primary" : "text-slate-300"
            }`}
            onClick={onPinnedNote}
          />
        </div>
        <div className="flex items-center justify-between mt-7">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MM YYYY")}
          </span>
        </div>
        <p className="">{content?.slice(0, 60)}</p>

        <div className="flex item-center justify-between mt-2">
          <div className="text-xs text-slate-500">
            {tags.map((item) => ` #${item}`)}
          </div>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faEdit}
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={onEdit}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
