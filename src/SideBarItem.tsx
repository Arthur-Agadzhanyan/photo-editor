import React,{ FC} from 'react';

interface Propertyes {
    name: string,
    active: boolean,
    handleClick(): void 
}

const SideBarItem: FC<Propertyes> = ({name,active,handleClick}) => {
    return (
        <button className='sidebar-item' style={{background: active ? "pink" : 'transparent'}} onClick={handleClick}> {name} </button>
    );
}

export default SideBarItem;
