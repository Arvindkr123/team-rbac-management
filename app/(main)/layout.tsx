import { ReactNode } from 'react'
import Header from '../components/layout/Header'
import { getCurrentUser } from '../lib/auth'
import { User } from '../types'

const MainLayout = async({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser() as User;
    console.log('user is main layout is', user);
    return (
        <>
            <Header user={user ?? null} />
            <main className='container mx-auto px-4 py-8'>
                {children}
            </main>
        </>
    )
}

export default MainLayout