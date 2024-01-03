import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";


const Page = async({params}:{params:{id:string}}) => {
  const user = await currentUser()
  
  if(!params.id) return null;
  if(!user) return null;
  const userInfo = await fetchUser(user.id)
  if(!userInfo.onboarded) redirect('/onboarding')
  const thread = await fetchThreadById(params.id)
  // console.log(`thread content in thread id ${thread}`)
  return (
    <section className="relative">
        <div>{
          thread? (
         <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={user?.id ||''}
              parenhtId={thread.parentId}
              content={thread.text}
              author={thread.author}
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.childern}/>):(
                <div>no threads</div>
              )
            }
        </div>
        <div className="mt-7">
          <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}/>
        </div>

        <div className="mt-10">
          {
           thread.childern && (thread.childern.map((child:any)=>(
              <ThreadCard
              key={child._id}
              id={child._id}
              currentUserId={user?.id ||''}
              parentId={child.parentId}
              content={child.text}
              author={child.author}
              community={child.community}
              createdAt={child.createdAt}
              comments={child.childern}
              isComment/>
            )))
          }
        </div>
    </section>
  )
}

export default Page