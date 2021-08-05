/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';

import './PhotoView.css';

const PhotoView = ({photo}) => {
    const { server, id, secret, title } = photo;
    const [ open, setOpen] = useState(false);
    return <>
                <div className='photo-container' onClick={() => setOpen(true)}>
                    <div className='photo-view'>
                        <img className='photo-tile' src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title.trim() || 'N/A'}></img>
                    </div>
                </div>
                {/* Modal */}
                <div id="myModal" className={`modal ${open && 'display'}`}  >
                    {/* Modal content */}
                    <div className="modal-content">
                        <span className="close" onClick={() => setOpen(false)}>&times;</span>
                        <p>Photo</p>
                        <div className='modal-photo-view'>
                            <img className='photo-tile' src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title.trim() || 'N/A'}></img>
                        </div>
                    </div>
                </div>
            </>
}

export default PhotoView;