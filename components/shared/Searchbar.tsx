"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"


const Searchbar = ({routeType}:{routeType:string}) => {
    const router = useRouter()
    const[search, setSearch]= useState("")
    useEffect(() => {
       
        const delayFn = setTimeout(()=>{
            if (search) {
                router.push(`/${routeType}?q=` + search);
              } else {
                router.push(`/${routeType}`);
              }
        },300)
     return ()=> clearTimeout(delayFn)
    }, [search])
    
  return (
    <div className="searchbar">
        <Image
        src='assets/search.svg'
        alt="search-bar"
        width={24}
        height={24}/>
    <Input
    id="text"
    value={search}
    onChange={(e)=> setSearch(e.target.value)}
    placeholder={`${routeType !== "/search"? "Search communities":"search creators"}`}/>
    </div>
  )
}

export default Searchbar