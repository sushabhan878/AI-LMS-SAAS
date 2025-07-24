
import CompanionCard from '@/components/CompanionCard';
import { getAllCompanions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils';
import React from 'react'

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
    const filteres = await searchParams;
    const subject = filteres?.subject ? filteres.subjects : "";
    const topic = filteres?.topic ? filteres.topic : "";

    const companions = await getAllCompanions({
        subject: typeof subject === 'string' ? subject : undefined,
        topic: typeof topic === 'string' ? topic : undefined
    })

    console.log(companions)
    return (
        <main className=''>
            <section className='flex justify-between gap-4 max-sm:flex--col'>
                <h1>Companion library</h1>
                <div className='flex gap-4'>
                    Filters
                </div>
            </section>
            <section className='companions-grid'>
                {companions.map((companion) => (
                    <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
                ))}
            </section>
        </main>
    )
}

export default CompanionLibrary
