'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in animation with optional slide
 */
export function fadeIn(
  element: HTMLElement | string,
  options?: {
    duration?: number;
    delay?: number;
    y?: number;
    x?: number;
    stagger?: number;
  }
) {
  const { duration = 0.8, delay = 0, y = 20, x = 0, stagger = 0 } = options || {};

  return gsap.from(element, {
    opacity: 0,
    y,
    x,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  });
}

/**
 * Scale in animation
 */
export function scaleIn(
  element: HTMLElement | string,
  options?: {
    duration?: number;
    delay?: number;
    stagger?: number;
  }
) {
  const { duration = 0.6, delay = 0, stagger = 0 } = options || {};

  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: 'back.out(1.7)',
  });
}

/**
 * Slide in from direction
 */
export function slideIn(
  element: HTMLElement | string,
  direction: 'left' | 'right' | 'top' | 'bottom',
  options?: {
    duration?: number;
    delay?: number;
    distance?: number;
    stagger?: number;
  }
) {
  const { duration = 0.8, delay = 0, distance = 100, stagger = 0 } = options || {};

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  };

  switch (direction) {
    case 'left':
      fromVars.x = -distance;
      break;
    case 'right':
      fromVars.x = distance;
      break;
    case 'top':
      fromVars.y = -distance;
      break;
    case 'bottom':
      fromVars.y = distance;
      break;
  }

  return gsap.from(element, fromVars);
}

/**
 * Stagger animation for lists
 */
export function staggerChildren(
  parent: HTMLElement | string,
  childSelector: string,
  options?: {
    duration?: number;
    stagger?: number;
    y?: number;
  }
) {
  const { duration = 0.6, stagger = 0.1, y = 20 } = options || {};

  const children = typeof parent === 'string'
    ? document.querySelectorAll(`${parent} ${childSelector}`)
    : parent.querySelectorAll(childSelector);

  return gsap.from(children, {
    opacity: 0,
    y,
    duration,
    stagger,
    ease: 'power3.out',
  });
}

/**
 * Scroll-triggered animation
 */
export function scrollReveal(
  element: HTMLElement | string,
  options?: {
    trigger?: HTMLElement | string;
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
    y?: number;
    scale?: number;
  }
) {
  const {
    trigger,
    start = 'top 80%',
    end = 'top 20%',
    scrub = false,
    markers = false,
    y = 50,
    scale = 1,
  } = options || {};

  return gsap.from(element, {
    opacity: 0,
    y,
    scale,
    scrollTrigger: {
      trigger: trigger || element,
      start,
      end,
      scrub,
      markers,
      toggleActions: 'play none none reverse',
    },
    ease: 'power3.out',
  });
}

/**
 * Hover animation utilities
 */
export function createHoverAnimation(
  element: HTMLElement,
  options?: {
    scale?: number;
    duration?: number;
    y?: number;
  }
) {
  const { scale = 1.05, duration = 0.3, y = -2 } = options || {};

  const handleMouseEnter = () => {
    gsap.to(element, {
      scale,
      y,
      duration,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration,
      ease: 'power2.out',
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Card flip animation
 */
export function flipCard(
  element: HTMLElement | string,
  options?: {
    duration?: number;
    delay?: number;
  }
) {
  const { duration = 0.8, delay = 0 } = options || {};

  return gsap.from(element, {
    rotationY: 90,
    opacity: 0,
    duration,
    delay,
    ease: 'back.out(1.7)',
    transformPerspective: 1000,
  });
}

/**
 * Typing text animation
 */
export function typeText(
  element: HTMLElement,
  text: string,
  options?: {
    duration?: number;
    delay?: number;
  }
) {
  const { duration = 2, delay = 0 } = options || {};

  const timeline = gsap.timeline({ delay });

  // Split text into characters
  const chars = text.split('');
  element.textContent = '';

  chars.forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    element.appendChild(span);

    timeline.to(span, {
      opacity: 1,
      duration: duration / chars.length,
    }, index * (duration / chars.length));
  });

  return timeline;
}

/**
 * Parallax scroll effect
 */
export function createParallax(
  element: HTMLElement | string,
  options?: {
    speed?: number;
    start?: string;
    end?: string;
  }
) {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options || {};

  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Page transition animation
 */
export function pageTransitionIn(options?: { duration?: number }) {
  const { duration = 0.6 } = options || {};

  return gsap.from('main', {
    opacity: 0,
    y: 20,
    duration,
    ease: 'power3.out',
  });
}

export function pageTransitionOut(options?: { duration?: number }) {
  const { duration = 0.4 } = options || {};

  return gsap.to('main', {
    opacity: 0,
    y: -20,
    duration,
    ease: 'power3.in',
  });
}

/**
 * Count up animation for numbers
 */
export function countUp(
  element: HTMLElement,
  targetValue: number,
  options?: {
    duration?: number;
    delay?: number;
    decimals?: number;
  }
) {
  const { duration = 2, delay = 0, decimals = 0 } = options || {};

  const obj = { value: 0 };

  return gsap.to(obj, {
    value: targetValue,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = obj.value.toFixed(decimals);
    },
  });
}

/**
 * Draw SVG path animation
 */
export function drawSVGPath(
  path: SVGPathElement | string,
  options?: {
    duration?: number;
    delay?: number;
  }
) {
  const { duration = 2, delay = 0 } = options || {};

  const pathElement = typeof path === 'string'
    ? document.querySelector(path) as SVGPathElement
    : path;

  if (!pathElement) return null;

  const length = pathElement.getTotalLength();

  return gsap.from(pathElement, {
    strokeDasharray: length,
    strokeDashoffset: length,
    duration,
    delay,
    ease: 'power2.inOut',
  });
}

/**
 * Magnetic button effect
 */
export function createMagneticEffect(button: HTMLElement, strength: number = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Cleanup all GSAP animations and ScrollTriggers
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}
