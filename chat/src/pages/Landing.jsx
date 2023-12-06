import React, { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import beanpod from '/src/img/beanpod.png'; // Importing the beanpod image

function App() {
  const ref = useRef();

  const handleLoginClick = () => {
    // Navigation logic to login screen goes here
  };

  return (
    <div>
      <Parallax pages={3} ref={ref}>
        {/* Full page background image */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={3} // Factor adjusted for the entire image height
          style={{
            backgroundImage: `url(${beanpod})`,
            backgroundSize: 'cover',
          }}
        />

        {/* Text layer at the beginning */}
        <ParallaxLayer
          offset={0.2}
          speed={0.1}
          onClick={() => ref.current.scrollTo(2)}
        >
          <h2>Welcome to BeanPod</h2>
        </ParallaxLayer>

        {/* Text layer at the end */}
        <ParallaxLayer
          offset={2}
          speed={0.5}
          onClick={() => ref.current.scrollTo(0)}
        >
          <h2>Let's Get Started</h2>
        </ParallaxLayer>

        {/* Button layer at the end */}
        <ParallaxLayer
          offset={2.5}
          speed={0.1}
          onClick={handleLoginClick}
        >
          <button style={{ margin: '0 auto', display: 'block' }}>
            Get Started
          </button>
        </ParallaxLayer>
      </Parallax> 
    </div>
  );
}

export default App;
