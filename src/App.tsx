import React, { SyntheticEvent, useEffect, useState } from 'react'
import SideBarItem from './SideBarItem';
import Slider from './Slider'

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
  const fileImage = React.useRef<HTMLImageElement>(null)
  const [fileUrl, setFileUrl] = useState('');
  const [options, setOptions] = useState<OPTION[]>(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const selectedOption = options[selectedOptionIndex]
  console.log(selectedOption);
  

  const onFileChange = (event: any) => {
    const fileSrc = event.target.files[0]
    if (fileSrc) {
      const reader = new FileReader()
      reader.onload = (ev: any) => {
        const src = ev.target.result
        setFileUrl(src)
      }

      reader.readAsDataURL(fileSrc)
    }

  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev): any => {
      return prev.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: e.target.value }
      })
    })
  }

  const getImageStyle = ():object=>{
    const filters = options.map(option=>{
      return `${option.property}(${option.value}${option.unit})`
    })
    return {filter: filters.join(' ')}
  }

  return (
    <div className='container'>
      <input type='file' accept='.png, .jpg, .jpeg, .gif' name='img' onChange={onFileChange} className={`fileInput`} />
      {fileUrl
        ? <>
          <div className="main-image">
            <img id='image' className={'image'} ref={fileImage} src={fileUrl} style={getImageStyle()}/>

          </div>
          <div className="sidebar">
            {options.map((item, i) => (
              <SideBarItem key={`${item}_${i}`} active={i === selectedOptionIndex} name={item.name} handleClick={() => setSelectedOptionIndex(i)} />
            ))}
          </div>

          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
          <br />
        </>
        : ''}
    </div>
  );
}

export default App;
