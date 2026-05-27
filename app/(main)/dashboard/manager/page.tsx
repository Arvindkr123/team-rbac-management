import ManagerDashboard from '@/app/components/dashboard/ManagerDashboard';
import { checkUserPermission, getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { TransformTeams, TransformUsers } from '@/app/lib/utils';
import { Role, User } from '@/app/types';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const Manager = async (props: Props) => {
  const user = await getCurrentUser() as User;
  if (!user || !checkUserPermission(user, Role.MANAGER)) {
    redirect("/unauthorized")
  }
  const myTeamMembers = user.teamId ?
   await prisma.user.findMany({
      where: {
        teamId: user.teamId,
        role: {
          not: Role.ADMIN
        }
      },
      include: {
        team: true
      }
    }) : []
  const allTeamMembers =await prisma.user.findMany({
    where: {
      role: {
        not: Role.ADMIN
      }
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
          code: true,
          description: true
        }
      }
    },
    orderBy: {
      teamId: 'desc'
    }
  })
  return (
    <ManagerDashboard myTeamMembers={TransformUsers(myTeamMembers)} allTeamMembers={TransformUsers(allTeamMembers)} currentUser={user} />
  )
}

export default Manager