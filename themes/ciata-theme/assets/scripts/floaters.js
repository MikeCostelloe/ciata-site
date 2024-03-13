import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

class StoryApp {
	init() {
    console.log("THREE!");
    //Tim Landgraf start here
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    //camera.position.y = 10;
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    //dom
    const container = document.querySelector('#stage');
    renderer.setSize( container.clientWidth, container.clientHeight );
    //background color that I currently have set to a transparent alpha channel
    renderer.setClearColor(0xFFFFFF, 0);
    container.appendChild( renderer.domElement );

    const light = new THREE.PointLight( 0x404040, 6, 50, 1);
    light.position.set(4, 22, 3 );
    //light.castShadow = true;
    scene.add( light );

    const materialHold = new THREE.MeshBasicMaterial( { color: 0xDDDDDD, colorWrite: false } );
    const materialWhite = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
		const materialOutline = new THREE.MeshBasicMaterial( { color: 0x48567a, side: THREE.BackSide } );
    const geometry = new THREE.SphereGeometry(.3, 32, 16);
    
    let blobs = [];
    const holder = new THREE.Group();
    for (let i=1; i<49; i++) {
      const sphereIn = new THREE.Mesh( geometry, materialHold );
      let x = THREE.MathUtils.randFloat(0,3);
      let y = THREE.MathUtils.randFloat(-4,4);
      let z = THREE.MathUtils.randFloat(-4,6);
      sphereIn.position.set(x,y,z);
      console.log(sphereIn);
      holder.add(sphereIn);
      const sphereOut = new THREE.Mesh( geometry, materialOutline );
      sphereOut.position.set(x,y,z);
      //below is the size difference between the inner and out radii of the circles
      sphereOut.scale.set(1.2, 1.2, 1.2);
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

    //post-processing
    const composer = new EffectComposer( renderer );
    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );
    
    const bokehPass = new BokehPass(scene, camera, {
      focus: 6,
      aperture: 0.005,
      maxblur: 0.015
    });
    composer.addPass( bokehPass );

    const bloomPass = new UnrealBloomPass({
      threshold: 2,
				strength: .2,
				radius: .2,
				exposure: 1
    });
    composer.addPass( bloomPass );

    const outputPass = new OutputPass();
    composer.addPass( outputPass );
    

    function animate() {
        requestAnimationFrame( animate );
        //lerp scroll
        //currentScroll += (scrollPercentRounded - currentScroll) * .1;
        //myTimeline.seek( (currentScroll/100) * runtime);
        composer.render();
        holder.rotation.z += .0002;
    };


      animate();
    };
}
export default StoryApp;