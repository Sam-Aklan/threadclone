"use server"
import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThreads({  text,
    author,
    communityId,
    path
}:Params) {
    
   try {
    connectToDB()
    console.log('start creating thread')
    const createdThread = await Thread.create({
        text,
        author,
        communityId: null,
    })
    console.log('create function excuted')
    await User.findByIdAndUpdate(author,
        {
        $push: {threads:createdThread._id}
    })
    revalidatePath(path)
   } catch (error) {
    console.log(`an Error happend during thread creation: ${error}`)

   }
}

export async function fetchPost(pageNumber=1, pageSize = 20) {

    try {
        await connectToDB()
    // calculate the number of posts to skip
    console.log('*******before post query*********')
    const skipAmount = (pageNumber - 1) * pageSize
    // Fetch the posts that have no parents
    const postQuery = Thread.find({parentId: {$in:[null,undefined]}}).sort({createdAt: 'desc'}).skip(skipAmount).limit(pageSize).populate(
        {path:'author', model:User}).populate({
        path: 'childern',
        populate:{
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
    })

    const posts = await postQuery.exec()
    // console.log(posts)
    const totalPostCount = await Thread.countDocuments({parentId: {$in:[null,undefined]}})

    
    // console.log(`fetch post: ${posts}`)
    const isNext = totalPostCount > skipAmount + posts.length
    return {posts, isNext}
    } catch (error: any) {
        console.log('an error accuired during post fetch: profile page')
        throw new Error(`failed to fetch post: ${error.message}`)
    }
}

export async function fetchThreadById(id:string){
     connectToDB()
    try {
        //todo populate community
        const thread =  await Thread.findById(id).populate({
            path: 'author',
            model: User,
            select:"_id id name image"
        }).populate({
            path: 'childern',
            populate:[
                {
                path:'author',
                model: User,
                select: "_id id name parentId image"
            },{
                path: 'childern',
                model: Thread,
                populate:{
                    path: 'author',
                    model:User,
                    select:"_id id name parentId image"
                },
            },
        ],
        }).exec()
        
        // console.log(`is thread: ${thread !==null || thread!==undefined}`)
        // console.log(thread)
        return thread
    } catch (error:any) {
        throw new Error(`failed to fetch a specific thread:${error.message}`)
    }
}
export async function addCommentToThread(
    threadId:string,
    comentText: string,
    userId: string,
    path: string
    ) {
        await connectToDB()
        try {
            const originalThread = await Thread.findById(threadId)
            if(!originalThread) throw new Error("Thread not found")
            const commentThread = new Thread({
            text: comentText,
            author: userId,
            parentId: threadId})
            const savedThread = await commentThread.save()
            originalThread.childern.push(savedThread._id)
            await originalThread.save()
            revalidatePath(path)
        } catch (error: any) {
            throw new Error(`failed to add a comment:${error.message}`)
        }
    
}