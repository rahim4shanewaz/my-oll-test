import React, { useState } from 'react';
import './App.css';
import checkmarkIcon from './images/check.png'
import imageIcon from './images/image_icon.png'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { Grid } from './Grid';
import { SortablePhoto } from './SortablePhoto';
import { Photo } from './Photo';
import photos from './photos.json';

const UploadGallery = () => {
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));



  const [selectedCount, setSelectedCount] = useState(selectedItems.length); // Step 1: State to track selected count




  const calculateColumns = () => {
    const screenWidth = window.innerWidth;
    let columns = 5;

    if (screenWidth <= 768) {
      columns = 3;
    }
    if (screenWidth <= 576) {
      columns = 2;
     
    }
    if (screenWidth <= 480) {
      columns = 1;
    }

    return columns;
  };

  // const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (index) => {
    let updatedSelectedItems;
    if (selectedItems.includes(index)) {
      updatedSelectedItems = selectedItems.filter((item) => item !== index);
    } else {
      updatedSelectedItems = [...selectedItems, index];
    }
  
    setSelectedItems(updatedSelectedItems);
  
    if (updatedSelectedItems.length === 0) {
      setSelectedCount(0); // Reset when no items are selected
    } else {
      setSelectedCount(updatedSelectedItems.length);
    }
  };
  
  const handleDeleteSelected = () => {
    const filteredItems = items.filter((item, index) => !selectedItems.includes(index));
    setItems(filteredItems);
    setSelectedItems([]);
    setSelectedCount(0); // Reset selected count when items are deleted
  };
  




function handleDragEnd(event) {
  const { active, over } = event;

  if (active && over && active.id && over.id && active.id !== over.id) {
    setItems((items) => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }

  setActiveId(null);
}

  return (
   <div >
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
   <div className='main-content'>
      <div  style={{padding:"10px 10px", width:"92%"}}>
          <div  className={`gllry ${selectedCount > 0 ? 'visible' : ''}`}> 
                 <h3>Gallery</h3> 
          </div>


        <div style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                  <div>
                      {selectedCount > 0 && (
                        <span style={{display:"flex", alignItems: "center", justifyContent:"space-between", gap:"10px"}}> <img style={{height:"20px", width:"20px"}} src={checkmarkIcon} alt="Checkmark Icon" /> <h3>{`${selectedCount} Files Selected`}</h3></span> 
                      )}
                    </div>
                    <div className={`delete-btn ${selectedCount > 0 ? 'visible' : ''}`}>
                      <button style={{color:"red",borderRadius:"0"}} onClick={handleDeleteSelected}>Delete Files</button>
                    </div>
                    
        </div>

        <hr />
      
      </div>
   
    
  
<div>
<SortableContext items={items} strategy={rectSortingStrategy}>
  <Grid columns={calculateColumns()}>
 
  
  
  {items.map((url, index) => (
     <div key={url} id="image-container" className={`item-${index + 1}`}>
     <SortablePhoto
       url={url}
       index={index}
       onCheckboxChange={handleCheckboxChange}
       selected={selectedItems.includes(index)}
     />
   </div>
    ))}
    <div className='uploadPhoto'>
    <img style={{height:"40px", width:"40px"}} src={imageIcon} alt="image Icon" />
    <h3>Add Images</h3>
    </div>

  </Grid>

</SortableContext>

  
</div>


      
   </div>

      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Photo url={activeId} index={items.indexOf(activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
    </div>


  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }


function handleDragEnd(event) {
  const { active, over } = event;

  if (active && over && active.id !== over.id) {
    setItems((items) => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }

  setActiveId(null);
}
  function handleDragCancel() {
    setActiveId(null);
  }
};

export default UploadGallery;
