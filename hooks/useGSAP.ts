import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

export interface UseGSAPOptions {
    scope?: gsap.DOMTarget;
    dependencies?: any[];
    revertOnUpdate?: boolean;
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 * Respects prefers-reduced-motion
 */
export function useGSAP(
    animationFn: (context: gsap.Context) => void | (() => void),
    options: UseGSAPOptions = {}
) {
    const { scope, dependencies = [], revertOnUpdate = true } = options;
    const contextRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        // Skip animations if user prefers reduced motion
        if (prefersReducedMotion()) {
            return;
        }

        // Create GSAP context for scoped animations
        const scopeElement = scope || undefined;
        contextRef.current = gsap.context(() => {
            animationFn(contextRef.current!);
        }, scopeElement as Element | undefined);

        // Cleanup function
        return () => {
            if (revertOnUpdate && contextRef.current) {
                contextRef.current.revert();
            }
        };
    }, dependencies);

    return contextRef;
}

/**
 * Hook for simple element animations on mount
 */
export function useAnimateOnMount(
    elementRef: MutableRefObject<HTMLElement | null>,
    animation: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline | null,
    dependencies: any[] = []
) {
    useGSAP(
        () => {
            if (elementRef.current) {
                animation(elementRef.current);
            }
        },
        { dependencies: [elementRef.current, ...dependencies] }
    );
}

/**
 * Hook for stagger animations on multiple elements
 */
export function useStaggerAnimation(
    containerRef: MutableRefObject<HTMLElement | null>,
    selector: string,
    animationFn: (elements: Element[]) => gsap.core.Tween | gsap.core.Timeline,
    dependencies: any[] = []
) {
    useGSAP(
        () => {
            if (containerRef.current) {
                const elements = containerRef.current.querySelectorAll(selector);
                if (elements.length > 0) {
                    animationFn(Array.from(elements));
                }
            }
        },
        { scope: containerRef.current, dependencies: [containerRef.current, ...dependencies] }
    );
}
