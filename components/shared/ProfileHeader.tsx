"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props{
    accountId: string,
    authUser: string,
    name: string,
    username: string,
    imgUrl: string,
    bio: string,
    type?:'User' | 'community'
}

const ProfileHeader = ({
    accountId,
    authUser,
    name,
    username,
    imgUrl,
    bio,
    type
}:Props) => {
   const router =useRouter()
  return (
    <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
                <div className="relative h-20 w-20 object-contain">
                    <Image
                    src={imgUrl}
                    alt="profile Image"
                    fill
                    className="rounded-full object-contain"/>
                </div>
                <div className="flex-1">
                    <h2 className="text-light-1">
                        {name}
                    </h2>
                    <p className="text-gray-1">
                        {username}
                    </p>
                </div> 
                {accountId === authUser &&(
                    <Button className="user-card_btn" onClick={()=>router.push(`/profile/edit`)}>
                        Edit Profile
                    </Button>
                )}
            </div>
        </div>
            {/*  todo community */ }
            
            
            <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
            <div className="'mt-12 h-0.5 w-full bg-dark-3"/>
    </div>
  )
}

export default ProfileHeader