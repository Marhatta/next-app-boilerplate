import Link from 'next/link';
import React, { useState } from 'react';

const UserPage = () => {
  // Declare a new state variable, which we'll call "count"
  const [userlist, setUserlist] = useState([{name :"harry"}]);


 const dispList = () =>{

    let allUsers = userlist.map( (u,i)=>{
    return <p> {u.name}</p>;
    });

     return allUsers
 }

  return (
    <div>
      <p>User api test</p>
      <Link href="/">
        <a>Go to home</a>
      </Link>
      <br/>
      <button onClick={() => {
          
          fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(json => {
            setUserlist(json);  
            console.log("we got the data here")
            console.log("we have user data",json)}
          
          )
          .catch( er =>{
              console.log("check internet/offline data not found")
          })

      }
      }>
        Click to get users
      </button>

      {
         dispList()
      }
    </div>
  );
}


export default  UserPage;