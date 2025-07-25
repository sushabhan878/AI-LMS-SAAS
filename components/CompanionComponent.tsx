"use client"

import { getSubjectColor } from '@/lib/utils'
import { error } from 'console'
import React, { useEffect, useState } from 'react'

enum CallStatus {
  INACTIVE,
  CONNECTING,
  ACTIVE,
  FINISHED
}

const CompanionComponent = ({ companionId, userName, userImage, subject, name, topic, style, voice }: CompanionComponentProps) => {

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)


  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnded = () => setCallStatus(CallStatus.FINISHED)
    const onMessage = () => {}
    const onError = (error: Error) => {
      console.error('Error occurred:', error)
    }
  }, [])

  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex gap-8 max-sm:flex-col'>
        <div className='companion-section'>
          <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
            <div className={`absolute transition-opacity duration-1000`}></div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default CompanionComponent
