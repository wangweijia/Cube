import React, { Component } from 'react';
import * as THREE from 'three';

export default class Cube extends Component {

    componentDidMount() {
        this.renderCube();
    }

    renderCube() {
        let scene = new THREE.Scene();
        
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        
        let renderer = new THREE.WebGLRenderer();
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.getElementById('cube-frame').appendChild(renderer.domElement);
        let geometry = new THREE.CubeGeometry(1,1,1);
        let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        let cube = new THREE.Mesh(geometry, material); 
        scene.add(cube);
        camera.position.z = 5;
        // const render = ()=>{
        //     requestAnimationFrame(render);
            cube.rotation.x = 1;
            cube.rotation.y = 0;
            cube.rotation.z = 0;
            renderer.render(scene, camera);
        // }
        // render();
    }

    render() {
        return (
            <div id='cube-frame' style={{
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'red'
            }} >

            </div>
        )
    }
}