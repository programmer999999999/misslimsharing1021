import React, { useEffect, useMemo, useRef, useState } from 'react';

const defaultSlides = [
  {
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
    caption: 'Cozy stays designed for comfort and convenience',
  },
  {
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop',
    caption: 'Modern interiors with all the essentials',
  },
  {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
    caption: 'Spacious living for families and groups',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    caption: 'Elegant design with a touch of luxury',
  },
  {
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop',
    caption: 'Fully equipped for your comfort and convenience',
  }
];

export default function Slideshow({ slides = defaultSlides, intervalMs = 4000, transitionMs = 2400 }) {
  const total = slides.length;
  const hasLoop = total > 1;

  // Build cloned slides for seamless infinite loop: [last, ...slides, first]
  const loopSlides = useMemo(() => {
    if (!hasLoop) return slides;
    const first = slides[0];
    const last = slides[total - 1];
    return [last, ...slides, first];
  }, [slides, total, hasLoop]);

  // Start at 1 (the first real slide) when looping; otherwise 0
  const [index, setIndex] = useState(hasLoop ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const trackRef = useRef(null);
  const isJumpRef = useRef(false);
  const isAnimatingRef = useRef(false);

  // If slides or loop availability changes, reset starting index
  useEffect(() => {
    setTransitionEnabled(false);
    setIndex(hasLoop ? 1 : 0);
    const id1 = requestAnimationFrame(() => {
      if (trackRef.current) void trackRef.current.getBoundingClientRect();
      const id2 = requestAnimationFrame(() => setTransitionEnabled(true));
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
  }, [hasLoop]);

  const next = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIndex((i) => i + 1);
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, transitionMs);
  };

  const prev = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIndex((i) => i - 1);
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, transitionMs);
  };

  const goReal = (i) => {
    const target = hasLoop ? i + 1 : i; // map real index to loop index
    if (target === index) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIndex(target);
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, transitionMs);
  };

  const realActive = hasLoop ? (index - 1 + total) % total : index;

  const trackStyle = useMemo(() => {
    const x = -index * 100;
    const style = { transform: `translateX(${x}%)` };
    if (!transitionEnabled) {
      style.transition = 'none';
    } else {
      style.transition = `transform ${transitionMs}ms ease-in-out`;
    }
    return style;
  }, [index, transitionEnabled, transitionMs]);

  // Autoplay: each slide stays full interval AFTER transition ends
  useEffect(() => {
    if (total <= 1 || !transitionEnabled) return;

    const el = trackRef.current;
    if (!el) return;

    let stayTimer;

    const handleTransitionEnd = (e) => {
      if (e.target !== el || e.propertyName !== 'transform') return;

      // Transition just finished → now wait full interval
      stayTimer = setTimeout(() => {
        setIndex((i) => i + 1);
      }, intervalMs);
    };

    // First load (no transition yet): schedule wait directly
    if (index === (hasLoop ? 1 : 0)) {
      stayTimer = setTimeout(() => {
        setIndex((i) => i + 1);
      }, intervalMs);
    }

    el.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      clearTimeout(stayTimer);
      el.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [index, intervalMs, total, transitionEnabled, hasLoop]);

  // Handle seamless jump after reaching clones
  useEffect(() => {
    if (!hasLoop) return;
    const el = trackRef.current;
    if (!el) return;
    const onEnd = (e) => {
      if (e.target !== el || e.propertyName !== 'transform') return;
      if (index === 0) {
        isJumpRef.current = true;
        setTransitionEnabled(false);
        setIndex(total);
        requestAnimationFrame(() => {
          if (trackRef.current) void trackRef.current.getBoundingClientRect();
          requestAnimationFrame(() => {
            isJumpRef.current = false;
            setTransitionEnabled(true);
            isAnimatingRef.current = false;
          });
        });
      } else if (index === total + 1) {
        isJumpRef.current = true;
        setTransitionEnabled(false);
        setIndex(1);
        requestAnimationFrame(() => {
          if (trackRef.current) void trackRef.current.getBoundingClientRect();
          requestAnimationFrame(() => {
            isJumpRef.current = false;
            setTransitionEnabled(true);
            isAnimatingRef.current = false;
          });
        });
      } else {
        isAnimatingRef.current = false;
      }
    };
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [index, total, hasLoop]);

  return (
    <div className="slideshow">
      <div ref={trackRef} className="slide-track" style={trackStyle}>
        {loopSlides.map((s, i) => (
          <div className="slide" key={`slide-${i}`}>
            <img src={s.src} alt={s.caption || `Slide ${i + 1}`} />
            {s.caption && <div className="slide-caption">{s.caption}</div>}
          </div>
        ))}
      </div>
      {hasLoop && (
        <>
          <button className="arrow prev" onClick={prev} aria-label="Previous slide">‹</button>
          <button className="arrow next" onClick={next} aria-label="Next slide">›</button>
        </>
      )}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === realActive ? 'active' : ''}`}
            onClick={() => goReal(i)}
          />
        ))}
      </div>
    </div>
  );
}
