import React, { ReactNode } from 'react'
import Header from '../components/layout/Header'

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header user={null} />
            <main className='container mx-auto px-4 py-8'>
                {children}
            </main>
        </>
    )
}

export default MainLayout