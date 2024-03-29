import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"

async function Page(){
    const user =  await currentUser()
    if(!user) return null;

    const userInfo = await fetchUser(user.id)

    const userData = {
        id: user?.id,
        objectId: userInfo?._id|| "",
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl

    }
    
    return(
        <main>
            <h1 className="head-text">
                onboarding
            </h1>
                <p className="mt-3">
                    compelte your profile now to use Threads
                </p>
            <section>
                <AccountProfile user={userData} btnTitle="Continue"/>
            </section>
        </main>
    )
}
export default Page