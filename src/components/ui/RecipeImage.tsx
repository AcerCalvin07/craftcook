'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<ImageProps, 'onError'>

export const RecipeImage = (props: Props) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={props.alt}
        className="absolute inset-0 flex items-center justify-center
                   bg-linear-to-br from-parchment to-gold/20 text-3xl"
      >
        🍳
      </div>
    )
  }

  // MealDB thumbs are already CDN-hosted JPEGs — bypass the Next optimizer
  // (Turbopack dev optimizer flakes on bursts; production gain is marginal).
  return <Image {...props} unoptimized onError={() => setFailed(true)} />
}
