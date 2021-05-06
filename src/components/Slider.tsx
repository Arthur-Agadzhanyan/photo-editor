import React, { FC } from 'react';
import { SliderProp } from '../interfaces';

const Slider: FC<SliderProp> = ({min,max,value,handleChange}) => {
    return (
        <div className='slider-container'>
            <input type="range" className='slider' min={min} max={max} value={value} onChange={handleChange}/>
            <p style={{textAlign: 'center'}}>{value}</p>
        </div>
    );
}

export default Slider;
