import Image from "next/image"

interface Props{
    accountId: string,
    authUser: string,
    name: string,
    username: string,
    imgUrl: string,
    bio: string,
}

const ProfileHeader = ({
    accountId,
    authUser,
    name,
    username,
    imgUrl,
    bio,
}:Props) => {
  return (
    <div className="flex">
        <div className="flex">
            <div className="flex">
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
            </div>
        </div>
            // todo community
            
            // bio
            <p className="mt-6">{bio}</p>
            <div className="mt-12"></div>
    </div>
  )
}

export default ProfileHeader