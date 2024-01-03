//app/page.tsx
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPost } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser()
  // if (!user) return null;
  const result = await fetchPost(1,30)
  // console.log(`home page posts: ${result.posts['author']}`)
  return (
    <div>
      <h1>
      Home
      </h1>
      <section className="">
        {
          result.posts.length === 0?(
            <p className="no-result">No threads</p>
          ):(
            <>
           { result.posts.map((post) => (
              <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={user?.id ||''}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.childern}/>
            ))}
            </>
          )
          
        }
      </section>
    </div>
  )
}