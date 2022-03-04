import React from "react";
import VideoEmbed from "./VideoEmbed";

function VideoPopUp({onClick}){
    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={onClick}>&times;</span>
                <div style={{width: '100%', float: 'left'}}>
                    <VideoEmbed embedId='MeGLywchaT0' />
                </div>
            </div>
        </div>
    );
};

export default VideoPopUp;