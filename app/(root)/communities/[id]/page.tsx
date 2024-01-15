
import Image from "next/image";
import { currentUser } from "@clerk/nextjs"
import { communityTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";

const Page = async({params}:{params:{id:string}}) => {

    const user = await currentUser()
    // console.log(`user info in the profile page:${user}`)
    console.log(`page id = ${params.id}`)
    console.log()
    if(!user) return null;

    const community = await fetchCommunityDetails(params.id)
    
  return (

    <section>
        <ProfileHeader
        accountId = {community.id}
        authUser={user.id}
        name={community.name}
        username={community.username}
        imgUrl = {community.image}
        bio={community.bio}
        type='community'/>
        <div className="mt-9">
            <Tabs defaultValue="threads"
            className="w-full">
                <TabsList className="tab">
                    {
                      communityTabs.map(tab=>(
                        <TabsTrigger key={tab.label}
                        value={tab.value} 
                        className="tab">
                          <Image
                          src={tab.icon}
                          alt={tab.label}
                          width={24}
                          height={24}
                          className="object-contain"/>
                          
                          <p className="max-sm:hidden">{tab.label}
                          </p>
                          {tab.label === 'Threads'&&(
                            <p className="text tiny-medium text-light-2">
                                {community?.threads?.length}
                            </p>
                          )}
                        </TabsTrigger>
                      ))
                    }
                </TabsList>
                
                  <TabsContent  value='threads'
                  className="w-full text-light-1">
                    <ThreadsTab
                    currentUserId = {user.id}
                    accountId={community._id}
                    accountType="Community"/>
                  </TabsContent>
                  {/* members */}
                  <TabsContent  value='members'
                  className="w-full text-light-1">
                    <section className="mt-9 flex flex-col gap-10">

                    {
                        community?.members.map((member:any)=>(
                            
                            <UserCard
                            key={member.id}
                            id={member.id}
                            name={member.name}
                            username={member.username}
                            imgUrl={member.image}
                            personType="User"/>
                            ))
                        }
                        </section>
                  </TabsContent>

                  {/* requsts */}
                  <TabsContent  value='requests'
                  className="w-full text-light-1">
                    <ThreadsTab
                    currentUserId = {user.id}
                    accountId={community._id}
                    accountType="Community"/>
                  </TabsContent>
                
            </Tabs>
        </div>
    </section>
  )
}

export default Page