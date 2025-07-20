import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
    return (
        <section className='cta-section'>
            <div className='cta-badge'>Start learning yoour way!</div>
            <h2 className='text-3xl font-bold'>
                Build your personalized learning companion!!
            </h2>
            <p>Pick a name, subject, voice and personality - and start learning through voice conversations with AI agents.</p>
            <Image src="/images/cta.svg" alt='cta' width={362} height={231} />
            <button className='btn-primary'>
                <Image src="/icons/plus.svg" alt='add a companion' width={12} height={12} />
                <Link href="/companions/new">
                    <p>build a new companion</p>
                </Link>
            </button>
        </section>
    )
}

export default CTA
