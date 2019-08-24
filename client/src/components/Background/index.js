import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Background.css';


// Background is a wrapper for a video bg
class Background extends Component {
  render() {
    return (
        <div className="video-wrapper">
            <ReactPlayer 
             url={'https://youtu.be/dN6vZrNtDVE'}
             className={"react-player"}
             playing={true}
             loop={true}
             controls={false}
             muted={true}
             volume={0}
             width={"100%"}
             height={"100%"}
             config={{
                youtube: {
                    playerVars: {
                        modestbranding: 1,
                    }
                }
            }}
             />
        </div>
    );
  }
}

export default Background;
