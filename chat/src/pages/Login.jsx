// import React, { useRef } from 'react';
// import { signInWithGoogle } from '../firebase';
// import { Parallax, ParallaxLayer } from '@react-spring/parallax';
// import beanpod from '/src/img/beanpod.png'; // Importing the beanpod image

// const Login = () => {
//   const ref = useRef();
//   return (
//     <div>
//       <Parallax pages={3} ref={ref}>
//         {/* Full page background image */}
//         <ParallaxLayer
//           offset={0}
//           speed={0.5}
//           factor={3}
//           style={{
//             backgroundImage: `url(${beanpod})`,
//             backgroundSize: 'cover',
//           }}
//         />

//         {/* Text layer at the beginning */}
//         <ParallaxLayer
//           offset={0.2}
//           speed={0.1}
//           onClick={() => ref.current.scrollTo(2)}
//         >
//           <h2>Welcome to BeanPod</h2>
//         </ParallaxLayer>

//         {/* Text layer at the end */}
//         <ParallaxLayer
//           offset={2}
//           speed={0.5}
//           onClick={() => ref.current.scrollTo(0)}
//         >
//           <h2>Let's Get Started</h2>
//         </ParallaxLayer>

//         {/* Button layer at the end */}
//         <ParallaxLayer
//           offset={2.1}
//           speed={0.1}
//         >
//           <div className='formContainer'>
//             <div className='formWrapper'>
//               <span className="logo">Bean Pod</span>
//               <button onClick={signInWithGoogle}>Sign in with Google</button>
//             </div>
//           </div>
//         </ParallaxLayer>
//       </Parallax>
//     </div>
//   );
// };

// export default Login;

import React, { useRef } from 'react';
import { signInWithGoogle } from '../firebase';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import beanpod from '/src/img/beanpod.png'; // Importing the beanpod image


const Login = () => {
  const ref = useRef();
  return (
    <div>
      <Parallax pages={1} ref={ref}>
        {/* Full page background image */}
        <ParallaxLayer
          offset={0}
          speed={0.0}
          factor={1}
          style={{
            backgroundImage: `url(${beanpod})`,
            backgroundSize: 'contain',
            backgroundPosition: 'right', // Shifts the background image to the right
          }}
        />




        {/*Text layer at the beginning*/}
        <ParallaxLayer
          offset={0.1}
          speed={0.0}
          onClick={() => ref.current.scrollTo(1)}
        >
          <h2>Welcome to BeanPod</h2>
        </ParallaxLayer>


        {/* Text layer at the end */}
        <ParallaxLayer
          offset={0.2}
          speed={0.0}
          onClick={() => ref.current.scrollTo(1)}
        >
          <h2>Let's Get Started</h2>
        </ParallaxLayer>


        {/* Button layer at the end */}
        <ParallaxLayer
          offset={0.1}
          speed={0.0}


        >
          <div className='formContainer'>
            <div className='formWrapper'>
              <span className="logo">Bean Pod</span>
              <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};


export default Login;