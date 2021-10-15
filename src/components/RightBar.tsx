import { useRef } from 'react';
import { FC } from 'react';
import { RightBarProp } from '../interfaces';

const RightBar: FC<RightBarProp> = ({canvasRef,DEFAULT_OPTIONS,downloadUrl,setDownloadUrl,setOptions,setFileUrl,setImgParams,setInitialImgParams,initialImgParams}) => {
    const downloadImg = () => {
        if (canvasRef.current)
          setDownloadUrl(canvasRef.current?.toDataURL('image/png'))
      }

      const fileInputRef = useRef<HTMLInputElement>(null)

      const onFileChange = (event: any) => {
        const fileSrc = event.target.files[0]
        if (fileSrc) {
          const reader = new FileReader()
          reader.onload = (ev: any) => {
            const src = ev.target.result
            let img = new Image();
            img.src = src
    
            img.onload = () => {
              if (canvasRef.current) {
                canvasRef.current.width = img.width
                canvasRef.current.height = img.height

                setImgParams({width:img.width,height:img.height})
                setInitialImgParams({width:img.width,height:img.height})
              }
            }
    
            setFileUrl(src)
          }
          reader.readAsDataURL(fileSrc)
        }
      }

      const resetChanges = ()=>{
        setOptions(DEFAULT_OPTIONS)
        // setImgParams(initialImgParams)

        // canvasRef.current!.width = initialImgParams.width
        // canvasRef.current!.height = initialImgParams.height
      }

    return (
        <div className="rightbar">
            <input type='file' ref={fileInputRef} accept='.png, .jpg, .jpeg, .gif' name='img' onChange={onFileChange} className={`fileInput`} />
            <button onClick={()=>fileInputRef.current?.click()}>Change Image</button>

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

            <button onClick={resetChanges}>Reset</button>
            {/* <input type='file' accept='.png, .jpg, .jpeg, .gif' name='img' onChange={onFileChange} className={`fileInput`} /> */}
        </div>
    );
}

export default RightBar;
