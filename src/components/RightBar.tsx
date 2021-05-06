import { FC } from 'react';
import { RightBarProp } from '../interfaces';

const RightBar: FC<RightBarProp> = ({canvasRef,DEFAULT_OPTIONS,downloadUrl,setDownloadUrl,setOptions}) => {
    const downloadImg = () => {
        if (canvasRef.current)
          setDownloadUrl(canvasRef.current?.toDataURL('image/png'))
      }
    return (
        <div className="rightbar">
            <button onClick={downloadImg}>Done</button>
            {downloadUrl
                ? <div className='download'>
                    <div className='overlay' onClick={() => setDownloadUrl('')}></div>
                    <div className="modal">
                        <h1 className='modal__title'>Photify</h1>
                        <p className='modal__text'>Download your edited image!</p>
                        <a href={downloadUrl} download><button className='download_link'>Download</button></a>
                    </div>
                </div>
                : ''}

            <button onClick={() => setOptions(DEFAULT_OPTIONS)}>Reset</button>
            {/* <input type='file' accept='.png, .jpg, .jpeg, .gif' name='img' onChange={onFileChange} className={`fileInput`} /> */}
        </div>
    );
}

export default RightBar;
