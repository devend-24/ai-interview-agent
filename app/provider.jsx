"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'

function Provider({children}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CreateNewUser = async () => {
      try {
        // Get the current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        console.log('User data:', user); // This should show in browser console
        
        if (authError) {
          console.error('Auth error:', authError);
          setLoading(false);
          return;
        }

        if (!user) {
          console.log('No user logged in');
          setLoading(false);
          return;
        }

        // Check if user exists in database
        const { data: Users, error: selectError } = await supabase
          .from('Users')
          .select('*')
          .eq('email', user.email);

        console.log('Existing users:', Users);

        if (selectError) {
          console.error('Select error:', selectError);
          setLoading(false);
          return;
        }

        // Insert new user if they don't exist
        if (Users?.length === 0) {
          const { data, error: insertError } = await supabase
            .from('Users')
            .insert([
              {
                name: user.user_metadata?.name,
                email: user.email,
                picture: user.user_metadata?.picture
              }
            ])
            .select(); // Add .select() to return the inserted data

          if (insertError) {
            console.error('Insert error:', insertError);
          } else {
            console.log('Inserted user:', data);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Unexpected error:', error);
        setLoading(false);
      }
    };

    CreateNewUser();
  }, []); // Empty dependency array is fine since we define the function inside

  return ( <UserDetailContext.Provider value={{loading, setLoading}}>
            <>{children}</>
           </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser=()=>{
  const context=useContext(UserDetailContext);
  return context;
}