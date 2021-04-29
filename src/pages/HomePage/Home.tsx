import React from 'react';
import { Link } from 'react-router-dom'

const mainStyle = {
    background: `url(/main-bg.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
}

const Home = () => {
    return (
        <div className='main' style={mainStyle}>
            <div className='container'>
                <h1 className='main__title'>Photify</h1>
                <h2 className='main__subtitle'>Free online development and editing tool that will satisfy all your photo and graphic needs!</h2>
                <Link to='/editor' className='main__link'>Start editing</Link>
            </div>
        </div>
    );
}

export default Home;
