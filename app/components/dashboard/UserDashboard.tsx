import { User } from '@/app/types'
import React from 'react'

type Props = {
  currentUser: User,
  myTeamMembers: User[]
}

const UserDashboard = ({ currentUser, myTeamMembers }: Props) => {
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard