import React, { FC, useState } from 'react';
import { SidebarProp } from '../interfaces';
import SideBarItem from './SideBarItem';

const MobileSidebar: FC<SidebarProp> = ({ options, selectedOptionIndex, handleClick }) => {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
    //() => mobileHandleClick(i)

    const mobileHandleClick = (i: number) => {
        setMobileMenuVisible(!mobileMenuVisible)
        handleClick(i)
    }

    return (
        <>
            <nav className='mobile'>
                <i className="fas fa-bars" onClick={() => setMobileMenuVisible(!mobileMenuVisible)}></i>
                <p>Photify</p>
            </nav>
            <div className='overlay' style={{ display: mobileMenuVisible ? 'block' : 'none' }} onClick={() => setMobileMenuVisible(!mobileMenuVisible)}></div>
            <div className="sidebar mobile_sidebar" style={{ marginLeft: mobileMenuVisible ? '0px' : '-300px' }}>
                {options.map((item, i) => (
                    <SideBarItem key={`${item}_${i}`} active={i === selectedOptionIndex} name={item.name} handleClick={() => mobileHandleClick(i)} />
                ))}
            </div>
        </>
    );
}

export default MobileSidebar;
