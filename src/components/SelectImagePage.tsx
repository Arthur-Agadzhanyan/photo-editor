import React, { useRef, useState } from 'react';
import { FC } from 'react';
import { SelectImagePageProp } from '../interfaces';

const selectImgStyle = {
    background: `url(https://i.pinimg.com/originals/1d/09/c4/1d09c4fb39f4ada83fc427e2df8cf8c5.png)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
}

const SelectImagePage: FC<SelectImagePageProp> = ({canvasRef,setFileUrl}) => {
    
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [downloadInputValue, setDownloadInputValue] = useState('')

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
              }
            }
    
            setFileUrl(src)
          }
          reader.readAsDataURL(fileSrc)
        }
      }

    const submitPhoto = (e: React.FormEvent) => {
        e.preventDefault()
        if (downloadInputValue.trim().length === 0) {
            alert('Should not consist of only spaces')
        }
        if (downloadInputValue.substr(0, 8) === 'https://' || downloadInputValue.substr(0, 7) === 'http://') {
            setFileUrl(downloadInputValue)
        }
    }

    return (
        <div className='select' style={selectImgStyle}>
            <div className='select__container'>
                <h2 className='select__title'>Select a local image or paste its url</h2>
                <div className="select__buttons">
                    <form className="button__block" onSubmit={submitPhoto}>
                        <h2 className="block__title">Url</h2>
                        <input className="block__input" type="text" value={downloadInputValue} onChange={(e) => setDownloadInputValue(e.target.value)} />
                    </form>

                    <div className="button__block">
                        <h2 className="block__title">Local</h2>
                        <input type='file' ref={fileInputRef} accept='.png, .jpg, .jpeg, .gif' name='img' onChange={onFileChange} className={`fileInput`} />
                        <button className='block__btn btn-local' onClick={() => fileInputRef.current?.click()}>Choose file</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectImagePage;
