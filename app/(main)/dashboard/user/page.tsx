import ManagerDashboard from '@/app/components/dashboard/ManagerDashboard';
import UserDashboard from '@/app/components/dashboard/UserDashboard';
import { checkUserPermission, getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { TransformUsers } from '@/app/lib/utils';
import { Role, User } from '@/app/types';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const UserPage = async (props: Props) => {
  const user = await getCurrentUser() as User;
  if (!user || !checkUserPermission(user, Role.USER)) {
    redirect("/unauthorized")
  }
  const myTeamMembers = user.teamId ?
    await prisma.user.findMany({
      where: {
        teamId: user.teamId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role:true
      }
    }) : []
  
  return (
    <UserDashboard myTeamMembers={TransformUsers(myTeamMembers)} currentUser={user} />
  )
}

export default UserPage