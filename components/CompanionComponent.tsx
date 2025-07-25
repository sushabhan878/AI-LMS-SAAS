"use client"

import { getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'

enum CallStatus {
  INACTIVE,
  CONNECTING,
  ACTIVE,
  FINISHED
}

const CompanionComponent = ({ companionId, userName, userImage, subject, name, topic, style, voice }: CompanionComponentProps) => {

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnded = () => setCallStatus(CallStatus.FINISHED)
    const onMessage = () => {}
    const onError = (error: Error) => console.error('Error occurred:', error)
    const onSpeackStart = () => setIsSpeaking(true)
    const onSpeachEnd = () => setIsSpeaking(false)

    // Vapi
    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnded)
    vapi.on("message", onMessage)
    vapi.on("error", onError)
    vapi.on("speech-start", onSpeackStart)
    vapi.on("speech-end", onSpeachEnd)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnded)
      vapi.off("message", onMessage)
      vapi.off("error", onError)
      vapi.off("speech-start", onSpeackStart)
      vapi.off("speech-end", onSpeachEnd)
    }
  }, [])

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play()
      } else {
        lottieRef.current?.stop()
      }
    }
  }, [isSpeaking, lottieRef])

  const toggelmicroohone = () => { 
    const isMuted = vapi.isMuted()
    vapi.setMuted(!isMuted)
    setIsMuted(!isMuted)
  }

  const handleConnect = async () => {

  }

  const handleDisconnect = async () => {

  }
  
  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex gap-8 max-sm:flex-col'>
        <div className='companion-section'>
          <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
            <div className={`absolute transition-opacity duration-1000 ${callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? "opacity-100" : "opacity-0"} ${callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"}`}>
              <Image src={`/icons/${subject}.svg`} alt='icon' width={150} height={150} className='max-sm:w-fit'/>
            </div>
            <div className={`absolute transition-opacity duration-1000 ${callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"}`}>
              <Lottie
                animationData={soundwaves}
                lottieRef={lottieRef}
                autoplay={false}
                className='companion-lottie'
              />
              </div>
          </div>
          <p className='font-bold text-2xl'>{name}</p>
        </div>
        <div className='user-section'>
          <div className='user-avatar'>
            <Image src={userImage} alt='user Image' width={130} height={130} className='rounded-lg' />
            <p className='font-bold text-2xl'>{ userName}</p>
          </div>
          <button className='btn-mic' onClick={toggelmicroohone}>
            <Image src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} alt='mic' width={36} height={36} />
            <p className='max-sm:hidden'>
              { isMuted ? "turn on microphone" : "turn off microphone" }
            </p>
          </button>
          <button className={`rounded-lg py-2 cursor-pointer transition-colors w-full text-white ${callStatus === CallStatus.ACTIVE ? "bg-red-500" : "bg-primary"} ${callStatus === CallStatus.CONNECTING && "animate-pulse"}`} onClick={() => {callStatus === CallStatus.ACTIVE ? handleDisconnect() : handleConnect()}}>
            {callStatus === CallStatus.ACTIVE ? "End the session" : callStatus === CallStatus.CONNECTING ? "Connecting ..." : "Start the session"}
          </button>
        </div>
      </section>
      <section className='transcript'>
        <div className='transcript-message no-scrollbar'>
          MESSAGES
        </div>
        <div className='transcript-fade'/>
      </section>
    </section>
  )
}

export default CompanionComponent
