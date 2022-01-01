import React from 'react'

import axios from "axios";

const CheckLogin =()=>{

    return(
        <div>

<button onClick={async()=>{
console.log(await axios.get('/api/profile',
{
 withCredentials: true,
}
 ));


}}>check login</button>

        </div>
    )
}

export default CheckLogin;