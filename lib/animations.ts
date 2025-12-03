import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Animation timing constants
export const TIMINGS = {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
    verySlow: 1.2,
} as const;

// Easing functions
export const EASINGS = {
    smooth: 'power2.out',
    snappy: 'power3.inOut',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'bounce.out',
} as const;

// Reusable animation presets
export const animations = {
    fadeIn: (element: gsap.TweenTarget, duration = TIMINGS.medium) => {
        return gsap.fromTo(
            element,
            { opacity: 0 },
            { opacity: 1, duration, ease: EASINGS.smooth }
        );
    },

    fadeOut: (element: gsap.TweenTarget, duration = TIMINGS.medium) => {
        return gsap.to(element, {
            opacity: 0,
            duration,
            ease: EASINGS.smooth,
        });
    },

    slideUp: (element: gsap.TweenTarget, duration = TIMINGS.medium, distance = 30) => {
        return gsap.fromTo(
            element,
            { opacity: 0, y: distance },
            { opacity: 1, y: 0, duration, ease: EASINGS.smooth }
        );
    },

    slideDown: (element: gsap.TweenTarget, duration = TIMINGS.medium, distance = 30) => {
        return gsap.fromTo(
            element,
            { opacity: 0, y: -distance },
            { opacity: 1, y: 0, duration, ease: EASINGS.smooth }
        );
    },

    slideLeft: (element: gsap.TweenTarget, duration = TIMINGS.medium, distance = 30) => {
        return gsap.fromTo(
            element,
            { opacity: 0, x: distance },
            { opacity: 1, x: 0, duration, ease: EASINGS.smooth }
        );
    },

    slideRight: (element: gsap.TweenTarget, duration = TIMINGS.medium, distance = 30) => {
        return gsap.fromTo(
            element,
            { opacity: 0, x: -distance },
            { opacity: 1, x: 0, duration, ease: EASINGS.smooth }
        );
    },

    scale: (element: gsap.TweenTarget, from = 0.8, duration = TIMINGS.medium) => {
        return gsap.fromTo(
            element,
            { opacity: 0, scale: from },
            { opacity: 1, scale: 1, duration, ease: EASINGS.smooth }
        );
    },

    stagger: (
        elements: gsap.TweenTarget,
        staggerAmount = 0.1,
        duration = TIMINGS.medium
    ) => {
        return gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration,
                stagger: staggerAmount,
                ease: EASINGS.smooth,
            }
        );
    },

    staggerCards: (
        elements: gsap.TweenTarget,
        staggerAmount = 0.15,
        duration = TIMINGS.slow
    ) => {
        return gsap.fromTo(
            elements,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration,
                stagger: staggerAmount,
                ease: EASINGS.snappy,
            }
        );
    },

    float: (element: gsap.TweenTarget, distance = 10, duration = 2) => {
        return gsap.to(element, {
            y: -distance,
            duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });
    },

    pulse: (element: gsap.TweenTarget, scale = 1.05, duration = 1) => {
        return gsap.to(element, {
            scale,
            duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });
    },

    reveal: (element: gsap.TweenTarget, direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom') => {
        const getFrom = () => {
            switch (direction) {
                case 'left':
                    return { x: -100, opacity: 0 };
                case 'right':
                    return { x: 100, opacity: 0 };
                case 'top':
                    return { y: -100, opacity: 0 };
                case 'bottom':
                default:
                    return { y: 100, opacity: 0 };
            }
        };

        return gsap.fromTo(
            element,
            getFrom(),
            {
                x: 0,
                y: 0,
                opacity: 1,
                duration: TIMINGS.slow,
                ease: EASINGS.snappy,
            }
        );
    },

    scrollReveal: (
        element: gsap.TweenTarget,
        options?: gsap.TweenVars
    ) => {
        const scrollTriggerOptions = options?.scrollTrigger || {};

        return gsap.fromTo(
            element,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: TIMINGS.slow,
                ease: EASINGS.smooth,
                scrollTrigger: {
                    trigger: element as gsap.DOMTarget,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    ...(typeof scrollTriggerOptions === 'object' ? scrollTriggerOptions : {}),
                },
                ...(options || {}),
            }
        );
    },
};

// Check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Wrapper to respect reduced motion
export const animateWithReducedMotion = (
    element: gsap.TweenTarget,
    animation: () => gsap.core.Tween | gsap.core.Timeline
) => {
    if (prefersReducedMotion()) {
        gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 });
        return null;
    }
    return animation();
};

export { gsap, ScrollTrigger };
