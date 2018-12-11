// import React from 'react';
// import LazyHero from 'react-lazy-hero';
//
// export default ParallaxLogoImage() {
//     return (
//         <div>
//             <LazyHero imageSrc="https://unsplash.it/2000/1000">
//                 <h1>Generic Startup Hype Headline</h1>
//             </LazyHero>
//
//         </div>
//     );
// }


import React, { Component } from 'react';
import LazyHero from 'react-lazy-hero';

import heroImage from '../../mountains.jpg';
import Logo from './Logo';

class ParallaxLogoImage extends Component {
    render() {
         return(
             <div>
                 <LazyHero
                     // className={props.knobs.className.current}
                     imageSrc={ heroImage }/*"https://unsplash.it/2000/1000"*/
                     color={"#fffff3"}
                     // isCentered={props.knobs.isCentered.current}
                     // isFixed={props.knobs.isFixed.current}
                     // key={props.id}
                     minHeight={"75vh"}
                     opacity={0.7}
                     parallaxOffset={100}
                     style={{ overflow: 'hidden' }}
                     transitionDuration={600}
                     // transitionT      imingFunction={props.knobs.transitionTimingFunction.current}
                 >
                     {/*<h1>Generic Startup Hype Headline</h1>*/}
                     <Logo />
                 </LazyHero>

             </div>
        );
    }
}

export default ParallaxLogoImage;
