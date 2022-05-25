import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

const Yoda = ({ callback }) => {
  return (
    <Spline
      scene="https://prod.spline.design/gX14TKQvY1tlfVZF/scene.splinecode"
      onLoad={callback}
    />
  );
};

Yoda.propTypes = {
  callback: PropTypes.func,
};

export default Yoda;
