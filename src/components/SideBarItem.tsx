import React,{ FC} from 'react';

interface Propertyes {
    name: string,
    active: boolean,
    handleClick(): void 
}

const SideBarItem: FC<Propertyes> = ({name,active,handleClick}) => {
    return (
        <button className='sidebar-item' style={{background: active ? "#fff" : 'transparent',color: active ? "#2b2c2f" : '#fff'}} onClick={handleClick}> {name} </button>
    );
}

export default SideBarItem;
