"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";
import mongoose, { FilterQuery, SortOrder,ObjectId } from "mongoose";

interface Params{
    userId:string;
    username:string;
    name:string;
    bio:string;
    image:string;
    path:string;  
}

export async function updateUser({
userId,
username,
name,
bio,
image,
path}:Params
): Promise<void>{
   await connectToDB()
   try {
    await User.findOneAndUpdate({
        id: userId
       },
       {
        username: username.toLocaleLowerCase(),
        name,
        bio,
        image,
        onboarded: true
       },{
        upsert: true
       });
       if(path ==='/profile/edit'){
        revalidatePath(path)
       }
   } catch (error) {
    console.log('user actions: cannot update')
    throw new Error(`Failed to create/update user: ${error}`)
   }
}

export async function fetchUser(userId: string){
    try {
        await connectToDB();
        return User.findOne({id:userId})
        //.populate({
        //     path:'communities',
        //     model: 'Community'
        // })
    } catch (error:any) {
        throw new Error(`Faild to fetch user: ${error.message}`)
    }
}

export async function fetchUserPost(userId:string) {
    try {
        connectToDB();
        const threads = await User.findOne({id:userId})
        .populate({
            path: 'threads',
            model: Thread,
            populate:{
                path: 'children',
                model: Thread,
                populate:{
                    path: 'author',
                    model: User,
                    select: 'name image id'
                }
            }
        })
        return threads
    } catch (error:any) {
        throw new Error(`faied to return threads: ${error.message}`)
    }
}

export async function fetchUsers({
    userId,
    searchString ="",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}:{
    userId:string;
    searchString?:string;
    pageNumber?:number;
    pageSize?:number;
    sortBy?:SortOrder; 
}) {
    try {
        connectToDB()
        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString,"i")
        const query: FilterQuery<typeof User> ={
            id: {$ne: userId}
        }
        if(searchString.trim()!== ''){
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}},
            ]
        }
        const sortOptions = {createdAt: sortBy}
        const userQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize)
        const totalUserCount = await User.countDocuments(query);
        const users = await userQuery.exec()
        const isNext = totalUserCount > skipAmount + users.length
        return {users, isNext}
    } catch (error:any) {
        throw new Error(`search failed: ${error.message}`)
    }
}
export async function getActivity(userId:string) {
    try {
        connectToDB()
        // console.log(typeof(userId))
        // Find all threads created by the user
        const userThreads = await Thread.find({author: userId})
        // Collect all the child thread ids (replies) from childern
        const childThreads = userThreads.reduce((acc,userThread)=>(
            acc.concat(userThread.childern)
        ),[])
        const replies = await Thread.find({
            _id:{$in: childThreads},
            // author: {$ne: userId}
        }).populate({
            path: 'author',
            model:User,
            select: 'name image _id'
        })
        return replies
    } catch (error: any) {
        throw new Error(`failed to fetch activity: ${error.message}`)
    }
}