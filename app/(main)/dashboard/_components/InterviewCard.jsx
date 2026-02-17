import React from 'react'
import moment from 'moment';
import { Button } from '@/components/ui/button'
import { Copy,Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

function InterviewCard({interview, viewDetail=false}) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;

    const copyLink=()=>{
        navigator.clipboard.writeText(url);
        toast('Copied to clipboard!');
    }

   const onSend = () => {
    const email = "devendramehetre@gmail.com";
    const subject = encodeURIComponent("Interview Link");
    const body = encodeURIComponent(
        `Hi,

    Here is your interview link:
    ${url}

    Best regards`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

  return (
    <div className='w-full min-w-0 p-5 bg-white rounded-lg border'>
        <div className='flex items-center justify-between'>


              <div className="h-[40px] w-[40px] bg-primary rounded-full 
                  flex items-center justify-center 
                  text-white font-bold text-lg">
                {interview?.jobPosition?.charAt(0)?.toUpperCase() ?? "?"}
              </div>


            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM YYYY')}</h2>  
        </div>
        <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
        
        {!viewDetail? <div className='mt-4 grid grid-cols-2 gap-3'>
            <Button variant="outline" className={'w-full'} onClick={copyLink}><Copy className="h-4 w-4 mr-2" /> Link</Button>
            <Button className={'w-full'} onClick={onSend}> <Send className="h-4 w-4 mr-2" /> Send</Button>
        </div>
        :
        <>
        <h2 className='mt-2 flex justify-between text-gray-500'>{interview?.duration}
            <span className='text-green-500'>{interview['interview-feedback']?.length} Candidates</span>
        </h2>
        <Link href={'/scheduled-interview/' + interview?.interview_id + '/details '} className='w-full'>
        <Button className="mt-5 w-full" variant="outline">View Detail <ArrowRight/> </Button>
        </Link>
        </>
}
    </div>
  )
}

export default InterviewCard
