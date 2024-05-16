"use client"

import { Award, Layers, Mail, Pen, User } from "lucide-react"
import NavbarItem from "./NavbarItem"

const NavbarRoutes = () => {
    const routes=[
        {
            path:'/',
            name:'Profile',
            icon:User
        },
        {
            path:'/skills',
            name:'Skills',
            icon:Award
        },
        {
            path:'/projects',
            name:'Projects',
            icon:Layers
        },
        {
            path:'/blogs',
            name:'Blog',
            icon:Pen
        },
        {
            path:'/contact',
            name:'Contact me',
            icon:Mail
        },

    ]
  return (
    <div className="flex items-start gap-3 border-r-[.5px] flex-col h-full">
        {routes.map(route=>(
            <NavbarItem
            key={route.name}
                label={route.name}
                path={route.path}
                icon={route.icon}
            />
        ))}
    </div>
  )
}

export default NavbarRoutes