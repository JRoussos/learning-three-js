import React, { useState } from 'react';

import './menu.css';

const Menu = ({ routes }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div style={{height: "100vh", width: "100vw", position: "absolute", zIndex: "2"}}>
            <div className="hamburger_wrapper" onClick={ () => setOpen(!open) }>
                <div className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="sidenav" style={{ right: open ? 0 : "-350px" }}>
                <ul> 
                    {routes.map( (r, index) => <li key={index}><button onClick={() => document.location.search = `page=${r.path}`}>{r.name}</button></li> )}
                </ul>
            </div>
        </div>
    )
}

export default Menu