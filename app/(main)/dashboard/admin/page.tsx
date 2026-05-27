import AdminDashboard from '@/app/components/dashboard/AdminDashboard';
import { checkUserPermission, getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { TransformTeams, TransformUsers } from '@/app/lib/utils';
import { Role, User } from '@/app/types';
import { redirect } from 'next/navigation';

type Props = {
}

const Admin = async (props: Props) => {
    const user = await getCurrentUser() as User;
    if (!user || !checkUserPermission(user, Role.ADMIN)) {
        redirect("/unauthorized")
    }

    // fetch data for admin
    const [prismaUsers, prismaTeams] = await Promise.all([
        prisma.user.findMany({
            include: {
                team: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }),
        prisma.team.findMany({
            include: {
                members: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        email: true,
                    }
                }
            }
        })
    ])
    return (
        <AdminDashboard
            users={TransformUsers(prismaUsers)}
            teams={TransformTeams(prismaTeams)}
            currentUser={user}
        />
    )
}

export default Admin