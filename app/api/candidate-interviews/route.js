import { supabase } from "@/services/supabaseClient";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (!email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // LEFT JOIN: Interviews + interview-feedback
    const { data, error } = await supabase
      .from("Interviews")
      .select(`
        jobPosition,
        interview_id,
        "interview-feedback" (
          recommeded,
          userEmail
        )
      `)
      .eq("userEmail",email);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    const formattedData = data.map((interview) => ({
      jobPosition: interview.jobPosition,
      interview_id: interview.interview_id,
      recommeded: interview["interview-feedback"]?.[0]?.recommeded ?? null,
    }));
    // Filter feedback for this specific user email
    // const formattedData = data.map((interview) => {
    //   const feedback = interview["interview-feedback"]?.find(
    //     (f) => f.userEmail === email
    //   );

    //   return {
    //     jobPosition: interview.jobPosition,
    //     interview_id: interview.interview_id,
    //     recommeded: feedback ? feedback.recommeded : null,
    //   };
    // });

    return Response.json({ data: formattedData });

  } catch (err) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
