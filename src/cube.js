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

const Points = [
    [
        [{x: -1, y: -1, z: -1}, {x: -1, y:  0, z: -1}, {x: -1, y:  1, z: -1}],
        [{x:  0, y: -1, z: -1}, {x:  0, y:  0, z: -1}, {x:  0, y:  1, z: -1}],
        [{x:  1, y: -1, z: -1}, {x:  1, y:  0, z: -1}, {x:  1, y:  1, z: -1}],
    ], 
    [
        [{x: -1, y: -1, z:  0}, {x: -1, y:  0, z:  0}, {x: -1, y:  1, z:  0}],
        [{x:  0, y: -1, z:  0}, {x:  0, y:  0, z:  0}, {x:  0, y:  1, z:  0}],
        [{x:  1, y: -1, z:  0}, {x:  1, y:  0, z:  0}, {x:  1, y:  1, z:  0}],
    ], 
    [
        [{x: -1, y: -1, z:  1}, {x: -1, y:  0, z:  1}, {x: -1, y:  1, z:  1}],
        [{x:  0, y: -1, z:  1}, {x:  0, y:  0, z:  1}, {x:  0, y:  1, z:  1}],
        [{x:  1, y: -1, z:  1}, {x:  1, y:  0, z:  1}, {x:  1, y:  1, z:  1}],
    ], 
]

export default class Cube extends Component {
    constructor(props) {
        super(props);

        this.onMouseDown = false;

        // 方位角
        this.angle1 = Math.PI / 2;
        // 仰角
        this.angle2 = 0;

        this.allObjects = [];
    }

    componentDidMount() {
        this.renderCube();

        this.rotate({x: 1, y: 1, z: 1}, 'x', 0);
    }

    cameraPosition(angle1, angle2) {
        // console.log(angle1, angle2);

        // 方位角
        // angle1
        // 仰角
        // angle2
        let x = CameraDistance * Math.sin(angle1) * Math.cos(angle2);
        let y = CameraDistance * Math.sin(angle1) * Math.sin(angle2);
        let z = CameraDistance * Math.cos(angle1);

        // console.log(x, y, z);

        return {
            x, y, z
        }
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

        let {x, y, z} = this.cameraPosition(this.angle1, this.angle2);

        let camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;
        // camera.up.x = 0;
        // camera.up.y = 0;
        // camera.up.z = 0;
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

        // #ff0000
        let lineX = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1 } ) );
        scene.add(lineX);
        // #00ff00
        let lineZ = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x00ff00, opacity: 1 } ) );
        lineZ.rotation.y = 90 * Math.PI / 180;
        scene.add(lineZ);
        // #0000ff
        let lineY = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x0000ff, opacity: 1 } ) );
        lineY.rotation.z = 90 * Math.PI / 180;
        scene.add(lineY);
    }

    initObject(scene) {
        let geometry2 = new THREE.CubeGeometry(ItemWidth, ItemWidth, ItemWidth); 
        let material2 = new THREE.MeshBasicMaterial({
            vertexColors: true,
        });

        let cubeEdges = new THREE.EdgesGeometry(geometry2, 1);
        let edgesMtl =  new THREE.LineBasicMaterial({color: 0x000000});

        this.allObjects = [];
        Points.map((stratum)=>{
            stratum.map((row)=>{
                row.map((item)=>{
                    let {x, y, z} = item;
                    let newItem = {x, y, z};
                    // edgesMtl.depthTest = false; 深度测试，若开启则是边框透明的效果
                    let cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
    
                    let cube = new THREE.Mesh(geometry2, material2);

                    cube.add(cubeLine);

                    cube.position.x = x * ItemWidth;
                    cube.position.y = y * ItemWidth;
                    cube.position.z = z * ItemWidth;
            
                    for (let index = 0; index < 12; index+=2) {
                        let color = Colors[index/2];
                        cube.geometry.faces[index].color.setHex(color);
                        cube.geometry.faces[index+1].color.setHex(color);
                    }

                    newItem.cube = cube;
                    this.allObjects.push(newItem);
            
                    scene.add(cube);
                })
            })
        })

        console.log(this.allObjects);
    }

    animation(scene, camera, renderer) {
        //renderer.clear();
        camera.position.x =camera.position.x +1;
        renderer.render(scene, camera);
        // requestAnimationFrame(()=>this.animation(scene, camera, renderer));
    }

    rotate(point, axle, direction=0) {
        // axle：需要考虑的2个坐标轴
        // direction 0:顺时针， 1:逆时针
        let {x, y, z} = point;

        let tempItems = [];
        for (let index = 0; index < this.allObjects.length; index++) {
            let element = this.allObjects[index];
            if (element[axle] === point[axle]) {
                tempItems.push(element);

                if (tempItems.length >= 9) {
                        break;
                }
            }
        }

        // console.log(tempItems);
        const newPoint = (a, b, r)=>{
            let na = a*Math.cos(r)*ItemWidth- b*Math.sin(r)*ItemWidth;
            let nb = a*Math.sin(r)*ItemWidth + b*Math.cos(r)*ItemWidth;

            return {na, nb};
        }

        let count = 1;
        const anime = (from, to, interval)=>{
            let i = (to - from) / interval;

            let v = count * i + from;
            let endX, endY, endZ;
            tempItems.map((item)=>{
                if (axle == 'x') {
                    item.cube.rotation.x = v;
                    let {na, nb} = newPoint(item.y, item.z, v);
                    item.cube.position.y = na;
                    item.cube.position.z = nb;
                    endX = item.x;
                    endY = na;
                    endZ = nb;
                } else if (axle == 'y') {
                    item.cube.rotation.y = v;
                    let {na, nb} = newPoint(item.x, item.z, v);
                    item.cube.position.x = na;
                    item.cube.position.z = nb;
                    endY = item.y;
                    endX = na;
                    endZ = nb;
                } else if (axle == 'z') {
                    item.cube.rotation.z = v;
                    let {na, nb} = newPoint(item.x, item.y, v);
                    item.cube.position.x = na;
                    item.cube.position.y = nb;
                    endZ = item.z;
                    endX = na;
                    endY = nb;
                }
            })
    
            this.renderer.render(this.scene, this.camera);
            count ++;
            if (count <= interval) {
                setTimeout(() => {
                    anime(from, to, interval);
                }, 100);
            } else {
                tempItems.map((item)=>{
                    item.x = endX;
                    item.y = endY;
                    item.z = endZ;
                })
            }

            // for (let index = 0; index <= interval; index++) {
            //     let v = index * i + from;
                
            //     tempItems.map((item)=>{
            //         item.cube.rotation[axle] = v;
        
            //     })
        
            //     this.renderer.render(this.scene, this.camera);
            // }
        }

        setTimeout(() => {
            console.log('ccccccccccccccccc');
            anime(0, Math.PI/2, 3);
        }, 5000);
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

                this.drx = this.angle1;
                this.dry = this.angle2;

            }} onMouseMove={(e)=>{
                if (this.onMouseDown) {
                    console.log('onMouseMove');
                    let {clientX, clientY, pageX, pageY, screenX, screenY} = e; 

                    if (this.clientX !== undefined && this.clientY !== undefined) {
                        // 向左为正，向右为负
                        let dx = this.clientX - clientX;
                        // 向上为正，向下为负
                        let dy = this.clientY - clientY;

                        this.drx = (this.angle1 + dx / window.innerWidth * 2 * Math.PI) % (2 * Math.PI);
                        this.dry = (this.angle2 + dx / window.innerWidth * 2 * Math.PI) % (2 * Math.PI);
                        // this.dry = this.angle2 -  (Math.PI - dy / window.innerHeight * Math.PI);

                        console.log(this.drx, this.dry);

                        let {x, y, z} = this.cameraPosition(this.drx, this.dry);

                        this.camera.position.x = x;
                        this.camera.position.y = y;
                        this.camera.position.z = z;

                        this.camera.lookAt(0, 0, 0);

                        this.renderer.clear();
                        this.renderer.render(this.scene, this.camera);
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

                this.angle1 = this.drx;
                this.angle2 = this.dry;
            }} >

            </div>
        )
    }
}