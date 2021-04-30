import React, { FC } from 'react';

interface Propertyes{
    min:number
    max:number
    value:number
    handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Slider: FC<Propertyes> = ({min,max,value,handleChange}) => {
    return (
        <div className='slider-container'>
            <input type="range" className='slider' min={min} max={max} value={value} onChange={handleChange}/>
            <p style={{textAlign: 'center'}}>{value}</p>
        </div>
    );
}

export default Slider;
