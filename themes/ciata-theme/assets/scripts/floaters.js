import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

class StoryApp {
	init() {
    console.log("THREE!");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    //camera.position.y = 10;
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    //dom
    const container = document.querySelector('#stage');
    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.setClearColor(0xFFFFFF, 0);
    container.appendChild( renderer.domElement );

    const light = new THREE.PointLight( 0x404040, 6, 50, 1);
    light.position.set(4, 22, 3 );
    //light.castShadow = true;
    scene.add( light );

    const materialHold = new THREE.MeshBasicMaterial( { color: 0xDDDDDD, colorWrite: false } );
    const materialWhite = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
		const materialOutline = new THREE.MeshBasicMaterial( { color: 0xe39f0d, side: THREE.BackSide } );
    const geometry = new THREE.SphereGeometry(.3, 32, 16);
    
    let blobs = [];
    const holder = new THREE.Group();
    for (let i=1; i<79; i++) {
      const sphereIn = new THREE.Mesh( geometry, materialHold );
      let x = THREE.MathUtils.randFloat(-4,-1);
      let y = THREE.MathUtils.randFloat(-1,5);
      let z = THREE.MathUtils.randFloat(-5,3);
      sphereIn.position.set(x,y,z);
      console.log(sphereIn);
      holder.add(sphereIn);
      const sphereOut = new THREE.Mesh( geometry, materialOutline );
      sphereOut.position.set(x,y,z);
      sphereOut.scale.set(1.02, 1.02, 1.02);
      holder.add(sphereOut);
    }
    scene.add( holder );

    function resize () {
      var width = document.body.clientWidth;
      var height = document.body.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function animate() {
        requestAnimationFrame( animate );
        //lerp scroll
        //currentScroll += (scrollPercentRounded - currentScroll) * .1;
        //myTimeline.seek( (currentScroll/100) * runtime);
        renderer.render( scene, camera );
        holder.rotation.z += .0002;
    };


      animate();
    };
}
export default StoryApp;