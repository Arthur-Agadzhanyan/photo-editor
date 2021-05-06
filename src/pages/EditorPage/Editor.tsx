import React, { useRef, useState } from 'react'
import EditorImage from '../../components/EditorImage';
import MobileSidebar from '../../components/MobileSidebar';
import RightBar from '../../components/RightBar';
import SelectImagePage from '../../components/SelectImagePage';
import Sidebar from '../../components/Sidebar';
import Slider from '../../components/Slider'
import { OPTION } from '../../interfaces';

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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [fileUrl, setFileUrl] = useState('');
  const [options, setOptions] = useState<OPTION[]>(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('');

  const selectedOption = options[selectedOptionIndex]

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev): any => {
      return prev.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: e.target.value }
      })
    })
    setDownloadUrl('')
  }
  return (
    <>
      {fileUrl
        ? <div className='editor-container'>
          <MobileSidebar options={options} selectedOptionIndex={selectedOptionIndex} handleClick={setSelectedOptionIndex} />

          <Sidebar options={options} selectedOptionIndex={selectedOptionIndex} handleClick={setSelectedOptionIndex} />

          <EditorImage options={options} fileUrl={fileUrl} canvasRef={canvasRef} contextRef={contextRef}/>

          <RightBar canvasRef={canvasRef} DEFAULT_OPTIONS={DEFAULT_OPTIONS} downloadUrl={downloadUrl} setDownloadUrl={setDownloadUrl} setOptions={setOptions}/>

          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
        </div>
        : <SelectImagePage canvasRef={canvasRef} setFileUrl={setFileUrl}/>
      }
    </>
  );
}

export default App;