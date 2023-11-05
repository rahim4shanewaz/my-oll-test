import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Photo } from './Photo';



// sortable drag and drop and checkbox feature code



export const SortablePhoto = (props) => {
  const sortable = useSortable({ id: props.url });

  const { attributes, listeners, isDragging, setNodeRef, transform, transition } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    
 
    <div>
    <div style={{position: "relative"}} className="image-container">
        <div  style={{position: "absolute", padding:"10px"}}>
        <input
        
          type="checkbox"
          checked={props.selected}
          onChange={() => props.onCheckboxChange(props.index)}
          className="image-checkbox"
        />
        </div>
      </div>
      <Photo ref={setNodeRef} style={style} {...props} {...attributes} {...listeners} >
        </Photo>
    </div>

    
  );
};
