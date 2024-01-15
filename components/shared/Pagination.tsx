"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"


const Pagination = ({pageNumber,isNext,path}:{
    pageNumber:number,
    isNext:boolean,
    path:string
}) => {
    console.log(`isnext in pagination ${isNext}`)
    const router = useRouter()
    const handleNavigation = (type:string)=>{
        let nextpage = pageNumber
        if (type === 'prev') {
           nextpage = Math.max(1,pageNumber - 1)
        }else if(type === 'next'){
            nextpage = pageNumber + 1
        }

        if (nextpage > 1) {
            router.push(`/${path}?page=${nextpage}`)
        }else{
            router.push(`/${path}`)
        }

    }
  return (
    <div>
        <Button 
        className="text-small-regular text-light-2"
        onClick={()=>{handleNavigation('prev')}}
        disabled={pageNumber ===1}>
            prev
        </Button>

        <Button 
        className="text-small-regular text-light-2"
        onClick={()=>{handleNavigation('next')}}
        disabled={!isNext}>
            next
        </Button>
    </div>
  )
}

export default Pagination