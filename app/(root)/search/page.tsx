


import UserCard from "@/components/cards/UserCard";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
    
const Page = async({params}:{params:{id:string}}) => {
    const user = await currentUser()

    if(!user) return null;

    const userInfo = await fetchUser(params.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
    // fetch all users
    const {users, isNext} = await fetchUsers({
      userId: user.id,
      searchString:'',
      pageNumber:1,
      pageSize:25
    })
  return (
    <section>
      <h1 className="head-text mb-10">
        {/* search bar */}
        <div className="mt-14 flex flex-col gap-5">
          {
            users.length === 0?(
              <p className="no-resut"> No Results</p>
            ):(
              users.map(person=>(
                <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.name}
                imgUrl={person.image}
                personType="User"/>
              ))
            )
          }
        </div>
      </h1>
    </section>
  )
}

export default Page