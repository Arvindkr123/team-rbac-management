"use client";
import { apiClient } from '@/app/lib/apiClient'
import { Role, Team, User } from '@/app/types'
import React, { useTransition } from 'react'

type Props = {
  currentUser: User,
  myTeamMembers: User[]
}
const UserDashboard = ({ currentUser, myTeamMembers}: Props) => {
  const [isPending, startTransition] = useTransition()
  return (
    <div className='space-y-6'>
      <div className="">
        <h1 className="text-2xl font-bold mb-2 text-white">
          User Dashboard
        </h1>
        <p className='text-slate-300'>Welcome, {currentUser.name}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Team Members */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="p-4 border-b border-slate-700">
            <h3 className='font-semibold text-white'>Team Members ({myTeamMembers.length})</h3>
          </div>
          <div className="p-4">
            {
              myTeamMembers.map((member)=>{
                return <div key={member.id} className='border-b border-slate-700 py-2 last:border-b-0'> 
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-slate-400">{member.email} . {member.role} .{member.team?.code}</p>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard