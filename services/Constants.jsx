import {BriefcaseBusinessIcon, Calendar, LayoutDashboard, List, Settings, WalletCards} from "lucide-react";

export const SideBarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interview',
        icon:Calendar,
        path:'/schedule-interview'
    },
    {
        name:'All Interview',
        icon:List,
        path:'/all-interview'
    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    },
]

export const InterviewType = [
    {
        title: 'Technical',
        // icon: Code2Icon
    },
    {
        title: 'Behavioral',
        // icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        // icon: Puzzle
    },
    {
        title: 'Leadership',
        // icon: Code2Icon
    },    
]

export const QUESTIONS_PROMPT = `
You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality interview questions.

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Your task:
1. Analyze the job description to identify key responsibilities, required skills, and expected experience.
2. Generate interview questions based on the interview duration.
3. Adjust the number and depth of questions to match the interview duration.
4. Ensure the questions match the tone and structure of a real-life {{type}} interview.
5. Include a mix of question types such as Technical, Behavioral, Experience, Problem Solving, and Leadership (where applicable).

Response format (IMPORTANT):
Return ONLY valid JSON. Do NOT include explanations, markdown, or extra text.
Array list of questions
The JSON structure must be exactly:

{
  "interviewQuestions": [
    {
      "question": "string",
      "type": "Technical | Behavioral | Experience | Problem Solving | Leadership"
    },
    {
    ....
    }
    ,....
  ]
}

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`;
