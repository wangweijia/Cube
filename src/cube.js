import React, { Component } from 'react';
import * as THREE from 'three';

const ItemWidth = 100;
const CameraDistance = 1000;

const Colors = [
    0x0000FF,
    0x00FF00,
    0xFF0000,
    0xFFFF00,
    0xFF00FF,
    0x00FFFF,
]

export default class Cube extends Component {
    constructor(props) {
        super(props);

        this.onMouseDown = false;
    }

    componentDidMount() {
        this.renderCube();
    }

    initThree() {
        let width = document.getElementById('canvas-frame').clientWidth;
        let height = document.getElementById('canvas-frame').clientHeight;

        let renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        renderer.setSize(width, height);
        document.getElementById('canvas-frame').appendChild(renderer.domElement);
        renderer.setClearColor(0xFFFFFF, 1.0);
        return renderer;
    }

    initCamera() {
        let width = document.getElementById('canvas-frame').clientWidth;
        let height = document.getElementById('canvas-frame').clientHeight;

        let camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
        camera.position.x = 0;
        camera.position.y = CameraDistance;
        camera.position.z = 0;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt(0, 0, 0);

        return camera;
    }

    initScene() {
        let scene = new THREE.Scene();
        return scene;
    }

    initLight(scene) {
        let light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        light.position.set(100, 100, 200);
        scene.add(light);
    }

    initCoordinate(scene) {
        let geometry = new THREE.Geometry();
        geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
        geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

        let lineX = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x00ff00, opacity: 1 } ) );
        scene.add(lineX);

        let lineZ = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1 } ) );
        lineZ.rotation.y = 90 * Math.PI / 180;
        scene.add(lineZ);

        let lineY = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x0000ff, opacity: 1 } ) );
        lineY.rotation.z = 90 * Math.PI / 180;
        scene.add(lineY);
    }

    initObject(scene) {
        let geometry2 = new THREE.CubeGeometry(ItemWidth,ItemWidth,ItemWidth); 
        let material2 = new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors
        });

        // for (let index = 0; index < 12; index+=2) {
        //     let color = Colors[index/2];
        //     geometry2.faces[index].color = color;
        //     geometry2.faces[index+1].color = color;
        // }

        let cube = new THREE.Mesh(geometry2, material2);
        // cube.position.x = 300;
        // cube.position.z = 300;

        for (let index = 0; index < 12; index+=2) {
            let color = Colors[index/2];
            cube.geometry.faces[index].color.setHex(color);
            cube.geometry.faces[index+1].color.setHex(color);
        }

        scene.add(cube);
    }

    animation(scene, camera, renderer) {
        //renderer.clear();
        camera.position.x =camera.position.x +1;
        renderer.render(scene, camera);
        // requestAnimationFrame(()=>this.animation(scene, camera, renderer));
    }

    renderCube() {
        let scene = this.initScene();
        this.scene = scene;

        let camera = this.initCamera();
        this.camera = camera;

        let renderer = this.initThree();
        this.renderer = renderer;

        this.initLight(scene);
        this.initCoordinate(scene);
        this.initObject(scene);


        this.animation(scene, camera, renderer);
    }

    render() {
        return (
            <div id='canvas-frame' style={{
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'red'
            }} onMouseDown={()=>{
                console.log('onMouseDown');
                this.onMouseDown = true;
            }} onMouseMove={(e)=>{
                if (this.onMouseDown) {
                    console.log('onMouseMove');
                    let {clientX, clientY, pageX, pageY, screenX, screenY} = e; 

                    if (this.clientX !== undefined && this.clientY !== undefined) {
                        // 向左为正，向右为负
                        let dx = this.clientX - clientX;
                        // 向上为正，向下为负
                        let dy = this.clientY - clientY;

                        let xR = 0 - dx * 2 * Math.PI / 1000000;
                        let yR = 0 + dy * 2 * Math.PI / 1000000;

                        let yy = Math.sin(xR) * CameraDistance;
                        let xx = Math.sin(yR) * CameraDistance;
                        
                        this.camera.rotation.y = yy;
                        this.camera.rotation.x = xx;
                        this.camera.rotation.z = Math.sqrt(CameraDistance*CameraDistance-yy*yy-xx*xx);
                        // this.camera.rotation.z = 90 * Math.PI / 180;

                        this.renderer.render(this.scene, this.camera);
                        // this.camera.updateMatrix();
                    } else {
                        this.clientX = clientX;
                        this.clientY = clientY;
                    }
                    // this.clientX = clientX;
                    // this.clientY = clientY;
                }
            }} onMouseUp={()=>{
                console.log('onMouseUp');
                this.onMouseDown = false;
                this.clientX = undefined;
                this.clientY = undefined;
            }} >

            </div>
        )
    }
}