import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl italic'>Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard
          id="123"
          name="Nura The brainy explorer."
          topic="Science"
          subject='Science'
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="456"
          name="Nura The brainy explorer."
          topic="Science"
          subject="English"
          duration={45}
          color="#e5d0ff"
        />
        <CompanionCard
          id="678"
          name="Nura The brainy explorer."
          topic="Science"
          subject="Math"
          duration={45}
          color="#bde7ff"
        />
      </section>
      <section className='home-section'>
        <CompanionsList
          title="Recently compleated Sessions"
          companions={recentSessions}
          className="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page