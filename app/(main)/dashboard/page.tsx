import { getCurrentUser } from "@/app/lib/auth"
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

type Props = {}

const Dashboard = async (props: Props) => {
    const user = await getCurrentUser();
    if(!user){
        redirect("/login")
    }

    // Redirect based on the role
    switch (user.role) {
        case Role.ADMIN:
            redirect("/dashboard/admin")
        case Role.MANAGER:
            redirect("/dashboard/manager")
        case Role.USER:
            redirect("/dashboard/user")
        default:
            redirect("/dashboard/user")
    }
}

export default Dashboard