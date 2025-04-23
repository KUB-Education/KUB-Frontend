import { Root, Loader } from './styles.tsx';
import { useEffect, useRef } from 'react';
import { delay, SECOND } from '@/common/utils';

const AppLoader = () => {
  const loaderRef = useRef<SVGSVGElement>(null);
  const interactiveRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (interactiveRef.current) return;

    const draw = async () => {
      const el = loaderRef.current;
      if (!el) return;

      await delay(SECOND / 2);
      el.classList.add('active');

      await delay(2.5 * SECOND);

      el.classList.remove('active');
    };

    draw();
    interactiveRef.current = setInterval(async () => draw(), 5 * SECOND);

    return () => {
      if (!interactiveRef.current) return;

      clearInterval(interactiveRef.current);
      interactiveRef.current = null;
    };
  }, []);

  return (
    <Root>
      <Loader
        ref={loaderRef}
        width="77"
        height="83"
        viewBox="0 0 77 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38.3919 3.34784L73.4468 18.0159L38.3919 32.6839L3.33691 18.0159L38.3919 3.34784Z"
          fill="#19A0FC"
          stroke="#050315"
          strokeWidth="6"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3.33691 18.0159L38.3919 32.6839V79.6522L3.33691 64.9841V18.0159Z"
          fill="#3BB3FF"
          stroke="#050315"
          strokeWidth="6"
          strokeLinejoin="round"
        ></path>
        <path
          d="M38.3921 32.6839L73.447 18.0159V64.9841L38.3921 79.6522V32.6839Z"
          fill="#147EF4"
          stroke="#050315"
          strokeWidth="6"
          strokeLinejoin="round"
        ></path>
        <path
          d="M38.3919 3.34784L73.4468 18.0159V64.9841L38.3919 79.6522L3.33691 64.9841V18.0159L38.3919 3.34784Z"
          stroke="#050315"
          strokeWidth="6"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3.33691 18.0159L38.3919 32.6839L73.4468 18.0159"
          stroke="#050315"
          strokeWidth="6"
          strokeLinecap="round"
        ></path>
        <path
          d="M38.3921 32.6839V79.6522"
          stroke="#050315"
          strokeWidth="6"
          strokeLinecap="round"
        ></path>
      </Loader>
    </Root>
  );
};

export default AppLoader;
