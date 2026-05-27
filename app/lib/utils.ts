import { Team, User } from "../types";

export function TransformUser(user: any): User {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        teamId: user.teamId,
        role: user.role,
        team: user.team,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}
export function TransformUsers(users: any[]): User[] {
    return users.map(TransformUser)
}
export function TransformTeam(team: any): Team {
    return {
        id: team.id,
        name: team.name,
        description: team.description,
        code: team.code,
        members: team.members,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
    }
}
export function TransformTeams(teams: any[]): Team[] {
    return teams.map(TransformTeam)
}   