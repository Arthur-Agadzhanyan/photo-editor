import React, { useEffect, useRef, useState } from 'react'
import SideBarItem from '../../components/SideBarItem';
import Slider from '../../components/Slider'

interface Range {
  min: number,
  max: number
}

interface OPTION {
  name: string,
  property: string,
  value: number,
  range: Range,
  unit: string
}

const selectImgStyle = {
  background: `url(https://i.pinimg.com/originals/1d/09/c4/1d09c4fb39f4ada83fc427e2df8cf8c5.png)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}

const DEFAULT_OPTIONS: OPTION[] = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileUrl, setFileUrl] = useState('');
  const [options, setOptions] = useState<OPTION[]>(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadInputValue, setDownloadInputValue] = useState('')
  const [mobileMenuVisible,setMobileMenuVisible] = useState(false)

  const selectedOption = options[selectedOptionIndex]

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
    if(downloadInputValue.trim().length === 0){
      alert('Should not consist of only spaces')
    }
    if(downloadInputValue.substr(0,8) === 'https://' || downloadInputValue.substr(0,7) === 'http://'){
      setFileUrl(downloadInputValue)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev): any => {
      return prev.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: e.target.value }
      })
    })
    setDownloadUrl('')
  }

  const downloadImg = () => {
    if (canvasRef.current)
      setDownloadUrl(canvasRef.current?.toDataURL('image/png'))
  }

  const mobileHandleClick = (i:number)=>{
    setMobileMenuVisible(!mobileMenuVisible)
    setSelectedOptionIndex(i)
  }

  return (
    <>
      {fileUrl
        ? <div className='editor-container'>
          <nav className='mobile'>
            <i className="fas fa-bars" onClick={()=>setMobileMenuVisible(!mobileMenuVisible)}></i>
            <p>Photify</p>   
          </nav>
          <div className='overlay' style={{display: mobileMenuVisible ? 'block' : 'none'}} onClick={()=>setMobileMenuVisible(!mobileMenuVisible)}></div>
          <div className="sidebar mobile_sidebar" style={{marginLeft: mobileMenuVisible ? '0px' : '-300px'}}>  
            {options.map((item, i) => (
              <SideBarItem key={`${item}_${i}`} active={i === selectedOptionIndex} name={item.name} handleClick={()=>mobileHandleClick(i)} />
            ))}
          </div>

          <div className="sidebar"> 
            {options.map((item, i) => (
              <SideBarItem key={`${item}_${i}`} active={i === selectedOptionIndex} name={item.name} handleClick={() => setSelectedOptionIndex(i)} />
            ))}
          </div>

          <div className="editor-image">
            <canvas className='canvas' ref={canvasRef} />
          </div>

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


          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
        </div>
        : <div className='select' style={selectImgStyle}>
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
                <button className='block__btn btn-local' onClick={()=>fileInputRef.current?.click()}>Choose file</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;
