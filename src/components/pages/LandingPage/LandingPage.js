import React from 'react'
import { Link } from 'react-router-dom'

function landingpage() {
    return (
        <div>
        <div>
           Welcome to ....
        </div>
        <div>
            <Link to="/login"> 
            <button >
                Login
            </button>
            </Link>
            <Link to="/register"> 
            <button >
            Sign up
            </button>
            </Link>
            
        </div>
        </div>
    )
}

export default landingpage
