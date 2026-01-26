import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Sidebar } from 'lucide-react'
import React from 'react'
import {AppSidebar} from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardProvider({children}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className='w-full p-10 bg-gray-100'>
          {/* <SidebarTrigger /> */}
          <WelcomeContainer />
              {children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider
