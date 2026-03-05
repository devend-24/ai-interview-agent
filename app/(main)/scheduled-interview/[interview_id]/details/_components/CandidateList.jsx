import React, {useState} from 'react'
import moment from 'moment';
import { Button } from '@/components/ui/button'
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({candidateList=[], interview_id}) {

  const [avgRating, setAvgRating] = useState(0);

  
  return (
    <div className='p-5'>
        <h2 className='font-bold my-5'>Candidates ({candidateList?.length})</h2>
      {candidateList.map((candidate, index)=>(
        <div key={index} className='p-5 mb-2 flex gap-3 items-center justify-between bg-white rounded-lg '>
            
            <div className='flex items-center gap-5'>
                <h2 className='bg-primary p-3 px-5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                <div>
                    <h2 className='font-bold'>{candidate?.userName}</h2>
                    <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate?.created_at).format('MMM DD, yyyy')}</h2>
                </div>
            </div>
            <div className='flex gap-3  items-center'>
                
                <CandidateFeedbackDialog 
                  candidate={candidate} 
                  interview_id={interview_id}
                  onSendRating={setAvgRating}
                />
            </div>
        </div>
      ))}
    </div>
  )
}

export default CandidateList
