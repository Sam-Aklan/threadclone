"use client"
import * as z from "zod"
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '../ui/textarea';
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from "@/lib/validations/thread";
import { updateThread } from "@/lib/actions/thread.actions";




const EditThread = ({text,accountId,id}:{text: string,accountId:string,id:string}) => {
const pathname = usePathname()
const router = useRouter()

 

const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues:{
      thread: text,
      accountId: accountId
      
    }
  })

  const onSubmit = async(values: z.infer<typeof ThreadValidation>) =>{
    await updateThread({ThreadId:id, content:values.thread})
    
    router.push('/')
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
    <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className='flex items-center gap-4'>
            <FormLabel className='text-base-semibold text-light-2'>
              Content
            </FormLabel>
            <FormControl>
              <Textarea
              rows={15}
              className='account-form_input no-focus'
              {...field}/>
            </FormControl>
            
          </FormItem>
        )}
      />
      <Button type="submit" className="bg-primary-500">
        Update thread
      </Button>
    </form>
    
    </Form>

  )
}

export default EditThread