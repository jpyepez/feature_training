if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

import createVideo from './createVideo';

createVideo('videoElement');

