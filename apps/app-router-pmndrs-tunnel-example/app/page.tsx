'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ShaderGradient = dynamic(() => import('shadergradient').then((mod) => mod.ShaderGradient), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), { ssr: false })

export default function Page() {
  return (
    <View className='size-96'>
      <Suspense fallback={null}>
        <ShaderGradient cDistance={24} color1='#ff5005' color2='#dbba95' color3='#d0bce1' />
      </Suspense>
    </View>
  )
}
