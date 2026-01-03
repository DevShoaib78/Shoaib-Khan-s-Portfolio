import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface LenisOptions {
    duration?: number
    easing?: (t: number) => number
    orientation?: 'vertical' | 'horizontal'
    gestureOrientation?: 'vertical' | 'horizontal' | 'both'
    smoothWheel?: boolean
    smoothTouch?: boolean
    touchMultiplier?: number
    wheelMultiplier?: number
    infinite?: boolean
    autoResize?: boolean
}

const defaultOptions: LenisOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false, // Usually better to disable for mobile
    touchMultiplier: 2,
    wheelMultiplier: 1,
    infinite: false,
    autoResize: true,
}

export function useLenis(options: LenisOptions = {}) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const lenis = new Lenis({
            ...defaultOptions,
            ...options,
        })

        lenisRef.current = lenis

        // Recursive animation frame loop
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Cleanup on unmount
        return () => {
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return lenisRef
}

export default useLenis
