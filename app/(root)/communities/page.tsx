


import CommunityCard from "@/components/cards/CommunityCard";
import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/Searchbar";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
    
const Page = async({searchParams}:{
  searchParams:{[key:string]:string |undefined}
}) => {
    const user = await currentUser()

    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    // console.log(`communities page onboarded = ${userInfo?.onboarded}`)
    
    if(!userInfo?.onboarded) redirect('/onboarding')
    // fetch all users
    const {communities, isNext} = await fetchCommunities({
      searchString:'',
      pageNumber:1,
      pageSize:25
    })
  return (
    <section>
      <h1 className="head-text mb-10">
        Search Communities
        </h1>
        {/* search bar */}
        <Searchbar
        routeType="communities"/>
        <div className="mt-14 flex flex-col gap-5">
          {
            communities.length === 0?(
              <p className="no-resut"> No Results</p>
            ):(
              communities.map(community=>(
                <CommunityCard
                key={community.id}
                id={community.id}
                members={community.members}
                name={community.name}
                username={community.name}
                imgUrl={community.image}
                bio={community.bio}
                />
              ))
            )
          }
        </div>
        <Pagination
          path='communities'
          pageNumber={searchParams?.page ? +searchParams.page:1}
          isNext={isNext}
          />
    </section>
  )
}

export default Page