import React, { ChangeEvent, FC } from 'react';
import { SidebarProp } from '../interfaces';
import SideBarItem from './SideBarItem';

const Sidebar: FC<SidebarProp> = ({options, selectedOptionIndex, handleClick, imgParams, setImgParams,canvasRef}) => {

    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value.length < 5){
            setImgParams({...imgParams, [e.target.name]: e.target.value})
            if(e.target.name === "width"){
                canvasRef.current!.width = +e.target.value
            }
            if(e.target.name === "height"){
                canvasRef.current!.height = +e.target.value
            }
        }
    }

    return (
        <div className="sidebar">
            <input type="number" name="width" value={imgParams.width} onChange={changeHandler}/>
            <input type="number" name="height" value={imgParams.height} onChange={changeHandler}/>

            {options.map((item, i) => (
                <SideBarItem key={`${item}_${i}`} active={i === selectedOptionIndex} name={item.name} handleClick={()=>handleClick(i)} />
            ))}
        </div>
    );
}

export default Sidebar;
