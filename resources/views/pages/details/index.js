import React from 'react'
import route from "ziggy-js/src/js";
export default function Homepage({title,subtitle}){

    return(
        <div>
            <h1>{title}</h1>
            <br/>
            <h2>{subtitle}</h2>
            <br/>
            welcome to details
            <br/>
            <a href={route('home')}> you can back to heme page click here</a>
        </div>
    )
}
