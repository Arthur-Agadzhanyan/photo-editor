import React, { FC } from 'react';
import { SidebarProp } from '../interfaces';
import SideBarItem from './SideBarItem';

const Sidebar: FC<SidebarProp> = ({options, selectedOptionIndex, handleClick}) => {
    return (
        <div className="sidebar">
            {options.map((item, i) => (
                <SideBarItem key={`${item}_${i}`} active={i === selectedOptionIndex} name={item.name} handleClick={()=>handleClick(i)} />
            ))}
        </div>
    );
}

export default Sidebar;
