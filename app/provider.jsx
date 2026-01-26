"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const CreateNewUser = async () => {
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        console.log("Auth user:", authUser);

        if (authError || !authUser?.email) {
          setLoading(false);
          return;
        }

        const { data: users, error: selectError } = await supabase
          .from("Users")
          .select("*")
          .eq("email", authUser.email);

        if (selectError) {
          console.error("Select error:", selectError);
          setLoading(false);
          return;
        }

        // ✅ EXISTING USER
        if (users && users.length > 0) {
          setUser(users[0]);
        }
        // ✅ NEW USER
        else {
          const { data: insertedUser, error: insertError } =
            await supabase
              .from("Users")
              .insert({
                name: authUser.user_metadata?.name,
                email: authUser.email,
                picture: authUser.user_metadata?.picture,
              })
              .select()
              .single();

          if (insertError) {
            console.error("Insert error:", insertError);
          } else {
            setUser(insertedUser);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Unexpected error:", error);
        setLoading(false);
      }
    };

    CreateNewUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, loading }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => useContext(UserDetailContext);
