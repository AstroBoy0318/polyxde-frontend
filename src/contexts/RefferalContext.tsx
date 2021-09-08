import React, { useEffect, useState } from 'react'
import queryString from 'querystring'
import { useCookies } from 'react-cookie'

const RefferalContext = React.createContext({ refferalAddress: "" })

const RefferalContextProvider = ({ children }) => {
  const [refferalAddress, setRefferalAddress] = useState("")
  const [cookies, setCookie] = useCookies(['referral']);

  useEffect(()=>{
    const query = queryString.parse(document.location.search);
    if(query['?ref'])
    {
      const ref = query['?ref'].toString()
      setRefferalAddress(atob(ref))
      setCookie('referral', refferalAddress, { maxAge: 3600*24*3 })
    }
    else if(cookies.referral){
      setRefferalAddress(cookies.referral)
    }
  },[refferalAddress, setRefferalAddress, cookies, setCookie])

  return (
    <RefferalContext.Provider value={{ refferalAddress }}>
      {children}
    </RefferalContext.Provider>
  )
}

export { RefferalContext, RefferalContextProvider }
