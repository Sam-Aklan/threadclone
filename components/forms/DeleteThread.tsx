"use client"
import { deleteThread } from "@/lib/actions/thread.actions"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

interface Props{
    threadId:string,
    currentUserId:string,
    authorId:string,
    parentId:string | null,
    isComment?:boolean
}

const DeleteThread = ({
    threadId,
    currentUserId,
    authorId,
    parentId,
    isComment,
}:Props) => {
    const path = usePathname()
    const router = useRouter()

    if(currentUserId !== authorId || path ==='/') return null

  return (
    <div className="flex gap-1">
        <Image
        src={'/assets/delete.svg'}
        width={18}
        height={18}
        alt="delete"
        className="cursor-pointer object-contain"
        onClick={async()=>{
            await deleteThread(JSON.parse(threadId),path)
            if(!parentId ||!isComment) router.push("/")
        }} />
        <Link href={`/thread/edit/${threadId}`}>
                    <Image
                    src='/assets/edit.svg'
                    width={18}
                    height={18}
                    alt='edit'
                    className="cursor-pointer object-contain"/>
                </Link> 
    </div>
  )
}

export default DeleteThread