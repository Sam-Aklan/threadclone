import EditThread from "@/components/forms/EditThread";
import { fetchUpdateThread } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";


const Page = async({params}:{params:{id:string}}) => {
    const user = await currentUser()
    console.log(`thread id: ${typeof(params.id)}`)
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
    const thread = await fetchUpdateThread(params.id)
    // console.log(`thread content ${thread}`)
  return (
    <>
    <h1 className="head-tex">
        Update Thread
    </h1>
    <EditThread accountId={userInfo._id}
    id={params.id}
    text={thread}/>
    </>
  )
}

export default Page