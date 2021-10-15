import React, { useRef, useState } from 'react'
import EditorImage from '../../components/EditorImage';
import MobileSidebar from '../../components/MobileSidebar';
import RightBar from '../../components/RightBar';
import SelectImagePage from '../../components/SelectImagePage';
import Sidebar from '../../components/Sidebar';
import Slider from '../../components/Slider'
import { DEFAULT_OPTIONS } from '../../constants';
import { OPTION } from '../../interfaces';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [fileUrl, setFileUrl] = useState('');

  const [imgParams, setImgParams] = useState({
    width: 0, height: 0
  })
  const [initialImgParams, setInitialImgParams] = useState({
    width: 0, height: 0
  })

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
    let img = new Image();
    img.src = fileUrl
    console.log(img.width);
    
    setDownloadUrl('')
  }

  return (
    <>
      {fileUrl
        ? <div className='editor-container'>
          <MobileSidebar options={options} selectedOptionIndex={selectedOptionIndex} handleClick={setSelectedOptionIndex} imgParams={imgParams} setImgParams={setImgParams} canvasRef={canvasRef}/>

          <Sidebar options={options} selectedOptionIndex={selectedOptionIndex} handleClick={setSelectedOptionIndex} imgParams={imgParams} setImgParams={setImgParams} canvasRef={canvasRef}/>

          <EditorImage options={options} fileUrl={fileUrl} canvasRef={canvasRef} contextRef={contextRef}/>

          <RightBar canvasRef={canvasRef} DEFAULT_OPTIONS={DEFAULT_OPTIONS} downloadUrl={downloadUrl} setDownloadUrl={setDownloadUrl} setOptions={setOptions} setFileUrl={setFileUrl} setImgParams={setImgParams} initialImgParams={initialImgParams} setInitialImgParams={setInitialImgParams}/>

          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
        </div>
        : <SelectImagePage canvasRef={canvasRef} setFileUrl={setFileUrl} setImgParams={setImgParams} setInitialImgParams={setInitialImgParams}/>
      }
    </>
  );
}

export default App;