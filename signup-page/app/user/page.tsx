"use client"

import axios from "axios"
async function fetchData(){
     const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
     console.log("response is" + JSON.stringify(response.data) ) ;
     return response.data;
}

export default async function User() {
  const data = await fetchData();


  return (
    <div>
      {data.name}
          {data.email}

    </div>
  )
}