import { useState } from 'react'

function Display({ value }){
    return(
        <div id='Display'>
            {value || "0"}
        </div>
    );
}
export default Display