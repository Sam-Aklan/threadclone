import Image from "next/image";
import Link from "next/link";

interface Props{
    id:string;
    currentUserId:string;
    parentId:string;
    content:string;
    author:{
        name: string;
        image: string;
        id: string
    };
    community:{
        id: string;
        name: string;
        image: string
    } | null;
    createdAt:string;
    comments:{
        author:{
            image:string;
        }
    }[];
    isComment?:Boolean
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment
    
}:Props) => {
    // console.log(`thread card author ${author}`)
    // console.log(`thread card id ${id}`)
  return (
    <article className={`flex w-full flex-col rounded ${isComment?'px-0 xs:px-7':'bg-dark-2 p-7'}`}>
        <div className='flex items-start justify-between'>
            <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                    <Link href={`/profile/${author?.id || null}`}>
                        <Image
                        src={author.image}
                        alt="profile image"
                        width={20}
                        height={20}
                        className="cursor-pointer"/>
                    </Link>
                    <div className="thread-card_bar"/>
                </div>
                <div className="flex w-full flex-col">
                    <Link href={`/profile/${author.id}`}>
                        <h4 className="cursor-pointercursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                    </Link>

                    <p className="text-small-regularmt-2 text-small-regular text-light-2">
                        {content}
                    </p>
                    <div className={`${isComment && 'mb-10'}mt-5 flex flex-col gap-3`}>
                        <div className="flex gap-3.5">
                            <Image
                            alt='icon' 
                            src='/assets/heart-gray.svg'
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain"/>
                            <Link href={`/thread/${id}`}>
                            <Image
                            alt='icon' 
                            src='/assets/reply.svg'
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain"/>
                            </Link>
                            <Image
                            alt='icon' 
                            src='/assets/repost.svg'
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain"/>
                            <Image
                            alt='icon' 
                            src='/assets/share.svg'
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain"/>
                        </div>
                        // coments section

                        {
                            isComment && comments.length>0 &&(
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies
                                    </p>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        
    </article>
  )
}

export default ThreadCard