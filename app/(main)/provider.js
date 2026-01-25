import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Sidebar } from 'lucide-react'
import React from 'react'
import {AppSidebar} from './_components/AppSidebar'

function DashboardProvider({children}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div>
        <SidebarTrigger />
            {children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider
