import React, { FC, useEffect } from 'react';
import { EditorImageProp } from '../interfaces';

const EditorImage: FC<EditorImageProp> = ({options,fileUrl,canvasRef,contextRef}) => {
    useEffect(() => {
        if (null !== canvasRef.current) {
          const canvas = canvasRef.current
    
          let img = new Image();
          img.crossOrigin = 'anonymous'
          img.src = fileUrl
    
          img.onload = () => {
            if (canvasRef.current && contextRef.current) {
              const canvas = canvasRef.current
              contextRef.current.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
          }
    
          const context = canvas.getContext('2d')
          if (context !== null) {
            contextRef.current = context
          }
          const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
          })
          if (contextRef.current) {
            contextRef.current.filter = filters.join(' ')
          }
        }
      })

    return (
        <div className="editor-image">
            <canvas className='canvas' ref={canvasRef} />
        </div>
    );
}

export default EditorImage;
