import React,{useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function CandidateFeedbackDialog({ candidate, onSendRating }) {
  const feedback = candidate?.feedback?.feedback

  const ratings = feedback?.rating;

  const averageRating = ratings
    ? (
        (Number(ratings.technicalSkills || 0) +
          Number(ratings.Communication || 0) +
          Number(ratings.problemSolving || 0) +
          Number(ratings.Experience || 0)) / 4
      ).toFixed(1)
    : 0;

  useEffect(() => {
    onSendRating(averageRating);
  }, [averageRating]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Report</Button>
      </DialogTrigger>
      <DialogContent style={{ width: '50vw', maxWidth: '50vw' }}>
        <DialogHeader className="items-start text-left">
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription className="w-full" asChild>
            <div className='mt-5'>
              <div className='flex  items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <h2 className='bg-primary p-3 px-5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                    <div>
                        <h2 className='font-bold'>{candidate?.userName}</h2>
                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                    </div>
                </div>
                <div className='flex gap-3  items-center'>
                    <h2 className='text-primary text-2xl font-bold'>{averageRating}/10</h2>
                </div>
              </div>

              <div className='mt-5'>
                <h2 className='font-bold'>Skills Assessment</h2>

                <div className='mt-3 p-5 grid grid-cols-2 gap-5'>
                  <div>
                    <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}</span></h2>
                    <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                  </div>
                  <div>
                    <h2 className='flex justify-between'>Communication <span>{feedback?.rating?.Communication}</span></h2>
                    <Progress value={feedback?.rating?.Communication*10} className='mt-1'/>
                  </div>
                  <div>
                    <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving}</span></h2>
                    <Progress value={feedback?.rating?.problemSolving*10} className='mt-1'/>
                  </div>
                  <div>
                    <h2 className='flex justify-between'>Experience<span>{feedback?.rating?.Experience}</span></h2>
                    <Progress value={feedback?.rating?.Experience*10} className='mt-1'/>
                  </div>
                </div>
              </div>

              <div className='mt-5'>
                  <h2 className='font-bold'>Performance Summary</h2>
                  <div>
                    <p className='text-sm leading-6'>{feedback?.summary}</p>
                  </div>
                  <div className={`p-5 mt-10  flex items-center justify-between rounded-md ${feedback?.Recommendation=='No'?'bg-red-100':'bg-green-100'}`}>
                        <div>
                          <h2 className={`font-bold ${feedback?.Recommendation=='No'?'text-red-600':'text-green-600'}`}>Recommedation Msg:</h2>
                          <p className={`${feedback?.Recommendation=='No'?'text-red-500':'text-green-500'}`}>{feedback?.RecommendationMsg}</p>
                        </div>
                        <Button className={`${feedback?.Recommendation=='No'?'bg-red-600':'bg-green-600'}`}>Send Msg</Button>
                  </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog