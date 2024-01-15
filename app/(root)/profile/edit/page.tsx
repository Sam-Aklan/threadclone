import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"

export const page = async() => {
 

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
  return (
    <>
      <h1>Edit Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Make any changes
      </p>

      <section className="mt-12">
        <AccountProfile
        user={userData}
        btnTitle="Continue"
        />
      </section>
    </>
  )
  }
export default page
