import { Team, User } from '@/app/types'
import React from 'react'

type Props = {
  myTeamMembers:User[],
  allTeamMembers:Team[],
  currentUser:User,
}

const ManagerDashboard = ({myTeamMembers, allTeamMembers, currentUser}: Props) => {
  return (
    <div>ManagerDashboard</div>
  )
}

export default ManagerDashboard