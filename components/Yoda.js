import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Model({ callback }) {
  return (
    <Spline
      scene="https://prod.spline.design/gX14TKQvY1tlfVZF/scene.splinecode"
      onLoad={callback}
    />
  );
}
