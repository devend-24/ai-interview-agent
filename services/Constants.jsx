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
        path:'/scheduled-interview'
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
1. Include 1–2 Data Structures & Algorithms (DSA) coding questions of Easy to Medium difficulty.
   - Each DSA question must be practical and interview-relevant.
   - Prefer topics like arrays, strings, hash maps, stacks, queues, recursion, or basic trees.
   - also give constraints in each question.

2. Analyze the job description to identify key responsibilities, required skills, and expected experience.
3. Generate interview questions based on the interview duration.
4. Adjust the number and depth of questions to match the interview duration.
5. Ensure the questions match the tone and structure of a real-life {{type}} interview.
6. Include a mix of question types such as Technical, Behavioral, Experience, Problem Solving, and Leadership (where applicable).

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


export const FEEDBACK_PROMPT = `
    {{conversation}}
    Depends on this Interview Conversation between assitant and user,
    Give me feedback for user interview. Give me rating out of 10 for 
    technical Skills, Communication, Problem Solving, Experince. 
    Also give me summary in 3 lines about the interview and one line 
    to let me know whether is recommanded for hire or not with msg.
    Give me response in JSON format like this
    {
        feedback:{
            rating:{
                techicalSkills:5,
                Communication:6,
                problemSolving:4,
                Experience:7
        },
        summary:<in 3 Line>,
        Recommendation:"",
        RecommendationMsg:""
        }
    }


    IMPORTANT:
- Return ONLY valid JSON.
- Do NOT include explanation.
- Do NOT include markdown.
- Do NOT wrap in \`\`\`json.
- Output must start with { and end with }.

`;