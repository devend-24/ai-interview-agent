"use client"

import Image from "next/image"
import {Button} from "@/components/ui/button"
import { candidateSideBar, SideBarOptions } from "@/services/Constants"
import Link from 'next/link';
import {Plus} from "lucide-react"
import {useUser} from "@/app/provider"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

export function AppSidebar() {

    const path=usePathname();
    const {user} = useUser();
    console.log(path);

    const sideBarOptions = user?.role === "recruiter"? SideBarOptions: candidateSideBar

  return (
    <Sidebar>
      <SidebarHeader className='flex items-center'>
        <Image src={'/mainlogo.png'} alt='logo' width={130} height={100}
                className="w-[150px] h-[100px]"/>

        { user?.role === "recruiter" && (
        <Button className='w-full mt-5'> 
          <Plus /> Create New Interview
        </Button>
        )}

      </SidebarHeader> 
      <SidebarContent>
        <SidebarGroup />
            <SidebarContent>
                <SidebarMenu>
                    {sideBarOptions.map((option, index)=>(
                        <SidebarMenuItem key={index} className='p-1'>
                            <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-blue-50'}`}>
                                <Link href={option.path}>
                                    <option.icon className={`${path == option.path && 'text-primary'}`}/>
                                    <span className={`text-[16px] font-medium ${path == option.path && 'text-primary'}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}