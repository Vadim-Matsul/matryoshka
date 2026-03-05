/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

const ROISTAT_PROJECT_ID = '6c8ae7c72e7624d60d17f44aaa534a5b'
const ROISTAT_HOST = 'cloud.roistat.com'

const ROISTAT_MODULE_SRC = `https://${ROISTAT_HOST}/dist/module.js`
const ROISTAT_INIT_SRC = `https://${ROISTAT_HOST}/api/site/1.0/${ROISTAT_PROJECT_ID}/init`

export function RoistatAnal() {
  const retryAttemptedRef = useRef(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (!scriptLoaded) return

    const timeout = setTimeout(() => {
      const isRoistatReady =
        typeof window !== 'undefined' &&
        typeof (window as any).roistat === 'object'

      if (isRoistatReady) return

      if (retryAttemptedRef.current) {
        console.error('[Roistat] failed to initialize after retry')
        return
      }

      retryAttemptedRef.current = true

      console.warn('[Roistat] module.js loaded but roistat not initialized, retrying init')

      const retryScript = document.createElement('script')
      retryScript.async = true
      retryScript.src =
        `${ROISTAT_INIT_SRC}?referrer=${encodeURIComponent(window.location.href)}`

      retryScript.onerror = () => {
        console.error('[Roistat] retry init failed')
      }

      document.head.appendChild(retryScript)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [scriptLoaded])

  return (
    <>
      <Script id="roistat-config" strategy="beforeInteractive">
        {`
          window.roistatProjectId = '${ROISTAT_PROJECT_ID}';
          window.roistatHost = '${ROISTAT_HOST}';
        `}
      </Script>

      <Script
        id="roistat-loader"
        strategy="beforeInteractive"
        src={ROISTAT_MODULE_SRC}
        onLoad={() => {
          setScriptLoaded(true)
        }}
        onError={() => {
          console.error('[Roistat] module.js failed to load')

          if (retryAttemptedRef.current) return
          retryAttemptedRef.current = true

          const fallback = document.createElement('script')
          fallback.async = true
          fallback.src =
            `${ROISTAT_INIT_SRC}?referrer=${encodeURIComponent(window.location.href)}`

          document.head.appendChild(fallback)
        }}
      />
    </>
  )
}
