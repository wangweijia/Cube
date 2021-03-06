import React, { Component } from 'react';
import * as THREE from 'three';

// +x 0-1
// -x 2-3
// +y 4-5
// -y 6-7
// +z 8-9
// -z 10-11

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
        [
            {x: -1, y: -1, z: -1, colorPoint: {x: -1, y: -1, z: -1}}, 
            {x: -1, y:  0, z: -1, colorPoint: {x: -1, y:  0, z: -1}}, 
            {x: -1, y:  1, z: -1, colorPoint: {x: -1, y:  1, z: -1}}
        ],
        [
            {x:  0, y: -1, z: -1, colorPoint: {x:  0, y: -1, z: -1}}, 
            {x:  0, y:  0, z: -1, colorPoint: {x:  0, y:  0, z: -1}}, 
            {x:  0, y:  1, z: -1, colorPoint: {x:  0, y:  1, z: -1}}
        ],
        [
            {x:  1, y: -1, z: -1, colorPoint: {x:  1, y: -1, z: -1}}, 
            {x:  1, y:  0, z: -1, colorPoint: {x:  1, y:  0, z: -1}}, 
            {x:  1, y:  1, z: -1, colorPoint: {x:  1, y:  1, z: -1}}
        ],
    ], 
    [
        [
            {x: -1, y: -1, z:  0, colorPoint: {x: -1, y: -1, z:  0}}, 
            {x: -1, y:  0, z:  0, colorPoint: {x: -1, y:  0, z:  0}}, 
            {x: -1, y:  1, z:  0, colorPoint: {x: -1, y:  1, z:  0}}
        ],
        [
            {x:  0, y: -1, z:  0, colorPoint: {x:  0, y: -1, z:  0}}, 
            {x:  0, y:  0, z:  0, colorPoint: {x:  0, y:  0, z:  0}}, 
            {x:  0, y:  1, z:  0, colorPoint: {x:  0, y:  1, z:  0}}
        ],
        [
            {x:  1, y: -1, z:  0, colorPoint: {x:  1, y: -1, z:  0}}, 
            {x:  1, y:  0, z:  0, colorPoint: {x:  1, y:  0, z:  0}}, 
            {x:  1, y:  1, z:  0, colorPoint: {x:  1, y:  1, z:  0}}
        ],
    ], 
    [
        [
            {x: -1, y: -1, z:  1, colorPoint: {x: -1, y: -1, z:  1}}, 
            {x: -1, y:  0, z:  1, colorPoint: {x: -1, y:  0, z:  1}}, 
            {x: -1, y:  1, z:  1, colorPoint: {x: -1, y:  1, z:  1}}
        ],
        [
            {x:  0, y: -1, z:  1, colorPoint: {x:  0, y: -1, z:  1}}, 
            {x:  0, y:  0, z:  1, colorPoint: {x:  0, y:  0, z:  1}}, 
            {x:  0, y:  1, z:  1, colorPoint: {x:  0, y:  1, z:  1}}
        ],
        [
            {x:  1, y: -1, z:  1, colorPoint: {x:  1, y: -1, z:  1}}, 
            {x:  1, y:  0, z:  1, colorPoint: {x:  1, y:  0, z:  1}}, 
            {x:  1, y:  1, z:  1, colorPoint: {x:  1, y:  1, z:  1}}
        ],
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

    initRaycaster() {
        this.raycaster = new THREE.Raycaster();//光线投射，用于确定鼠标点击位置
        this.mouse = new THREE.Vector2();
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
        scene.autoUpdate = true;
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

        const oneItem = (item, needPush) => {
            let {x, y, z, colorPoint} = item;
            let newItem = {x, y, z, colorPoint};
            // edgesMtl.depthTest = false; 深度测试，若开启则是边框透明的效果
            let cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
    
            let cube = new THREE.Mesh(geometry2, material2);
            cube.matrix = new THREE.Matrix4();
            // cube.matrixAutoUpdate = true;
    
            cube.add(cubeLine);
    
            cube.position.x = colorPoint.x * ItemWidth;
            cube.position.y = colorPoint.y * ItemWidth;
            cube.position.z = colorPoint.z * ItemWidth;
    
            for (let index = 0; index < 12; index+=2) {
                let color = Colors[index/2];
                cube.geometry.faces[index].color.setHex(color);
                cube.geometry.faces[index+1].color.setHex(color);
            }
    
            newItem.cube = cube;
            if (needPush) {
                this.allObjects.push(newItem);
            }
    
            scene.add(cube);
        }

        if (this.allObjects === undefined || this.allObjects.length === 0) {
            this.allObjects = [];

            Points.map((stratum)=>{
                stratum.map((row)=>{
                    row.map((item)=>{
                        oneItem(item, true);
                    })
                })
            })
        } else {
            this.allObjects.map((item)=>{
                oneItem(item, false);
            })
        }
    }

    animation(scene, camera, renderer) {
        camera.position.x =camera.position.x +1;
        renderer.render(scene, camera);
    }

    rotate(point, axle, direction=0) {
        // axle：需要考虑的2个坐标轴
        // direction 0:顺时针， 1:逆时针

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

        const newPoint = (a, b, r)=>{
            let na = a*Math.cos(r)*ItemWidth - b*Math.sin(r)*ItemWidth;
            let nb = a*Math.sin(r)*ItemWidth + b*Math.cos(r)*ItemWidth;

            return {na, nb};
        }

        let count = 1;
        const anime = (from, to, interval)=>{

            let axis = undefined;
            let rotWorldMatrix = undefined;

            let i = (to - from) / interval;

            let v = count * i + from;
            let endPoints = [];
            tempItems.map((item)=>{
                if (axle === 'x') {
                    axis = new THREE.Vector3(1,0,0); 
                    let {na, nb} = newPoint(item.y, item.z, v);
                    item.cube.position.y = na;
                    item.cube.position.z = nb;
                    endPoints.push({x: item.x, y: na/ItemWidth, z: nb/ItemWidth });
                } else if (axle === 'y') {
                    axis = new THREE.Vector3(0,1,0); 
                    let {na, nb} = newPoint(item.z, item.x, v);
                    item.cube.position.x = nb;
                    item.cube.position.z = na;
                    endPoints.push({x: nb/ItemWidth, y: item.y, z: na/ItemWidth });
                } else if (axle === 'z') {
                    axis = new THREE.Vector3(0,0,1); 
                    let {na, nb} = newPoint(item.x, item.y, v);
                    item.cube.position.x = na;
                    item.cube.position.y = nb;
                    endPoints.push({x: na/ItemWidth, y: nb/ItemWidth, z: item.z });
                }

                rotWorldMatrix = new THREE.Matrix4();
                rotWorldMatrix.makeRotationAxis(axis.normalize(), i);
                rotWorldMatrix.multiply(item.cube.matrix);
                item.cube.matrix = rotWorldMatrix;

                // item.rotWorldMatrix = rotWorldMatrix;
                item.cube.rotation.setFromRotationMatrix(item.cube.matrix);
            })
    
            count ++;
            if (count <= interval) {
                this.renderer.render(this.scene, this.camera);
                setTimeout(() => {
                    anime(from, to, interval);
                }, 100);
            } else {
                tempItems.map((item, index)=>{
                    item.x = parseInt(endPoints[index].x.toFixed(1));
                    item.y = parseInt(endPoints[index].y.toFixed(1));
                    item.z = parseInt(endPoints[index].z.toFixed(1));
                });
                // this.renderer.clear();
                this.renderer.render(this.scene, this.camera);

            }
        }

        let pi = direction === 0 ? Math.PI : - Math.PI;

        anime(0, pi/2, 3);

    }

    renderCube() {
        this.initRaycaster();
        
        this.scene = this.initScene();

        this.camera = this.initCamera();

        this.renderer = this.initThree();

        this.initLight(this.scene);
        this.initCoordinate(this.scene);
        this.initObject(this.scene);


        this.animation(this.scene, this.camera, this.renderer);
    }

    _onMouseDown = (e)=>{
        let {clientX, clientY} = e; 
        this.clientX = clientX;
        this.clientY = clientY;

        //将html坐标系转化为webgl坐标系，并确定鼠标点击位置
        this.mouse.x =  clientX / this.renderer.domElement.clientWidth*2-1;
        this.mouse.y =  -(clientY / this.renderer.domElement.clientHeight*2)+1;
        //以camera为z坐标，确定所点击物体的3D空间位置
        this.raycaster.setFromCamera(this.mouse, this.camera);
        //确定所点击位置上的物体数量
        let intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            let item = intersects[0];
            this.cubeItem = item;
        } else {
            this.onMouseDown = true;

            this.drx = this.angle1;
            this.dry = this.angle2;
        }
    }

    _onMouseMove = (e)=>{
        let {clientX, clientY} = e; 

        if (this.cubeItem !== undefined) {
            //将html坐标系转化为webgl坐标系，并确定鼠标点击位置
            this.mouse.x =  e.clientX / this.renderer.domElement.clientWidth*2-1;
            this.mouse.y =  -(e.clientY / this.renderer.domElement.clientHeight*2)+1;
            //以camera为z坐标，确定所点击物体的3D空间位置
            this.raycaster.setFromCamera(this.mouse, this.camera);
            //确定所点击位置上的物体数量
            let intersects = this.raycaster.intersectObjects(this.scene.children);
            
            if (intersects.length > 0) {
                let tempItem = intersects[0];

                let p = ['x', 'y', 'z'];

                let dx = tempItem.point.x - this.cubeItem.point.x;
                let dy = tempItem.point.y - this.cubeItem.point.y;
                let dz = tempItem.point.z - this.cubeItem.point.z;

                let dp = {
                    'x': dx,
                    'y': dy,
                    'z': dz
                }

                let maxK = undefined;
                let maxDD = 0;
                for (let index = 0; index < p.length; index++) {
                    const aKey = p[index];
                    let v = Math.abs(dp[aKey]);
                    maxK = aKey;
                    maxDD = dp[aKey];
                    for (let j = index+1; index < p.length; index++) {
                        const k2 = p[j];
                        let v2 = Math.abs(dp[k2]);
                        if (v2 > v) {
                            maxK = undefined;
                            maxDD = 0;  
                            break;
                        }
                    }
                    if (maxK === aKey) {
                       break; 
                    }
                }

                if (Math.abs(maxDD) > ItemWidth/2) {
                    let points = this.cubeItem.point;
                    let normalK = undefined;
                    for (let index = 0; index < p.length; index++) {
                        const aKey = p[index];
                        let v = points[aKey];
                        if (Math.abs(v) >= (1.5*ItemWidth-0.1)) {
                            normalK = aKey;
                            break;
                        }
                    }

                    let {x, y, z} = this.cubeItem.point;

                    const newPoint = (p) => {
                        let a = parseInt((Math.abs(p) + ItemWidth/2 - 1) / ItemWidth);
                        if (p >= 0) {
                            return a
                        } else {
                            return -a;
                        }
                    }
                    let itemx = newPoint(x);
                    let itemy = newPoint(y);
                    let itemz = newPoint(z);

                    let point = {x: itemx, y: itemy, z: itemz};

                    let a1 =  p.indexOf(normalK);
                    if (a1 > -1) {
                        p.splice(a1, 1);
                    }
                    let a2 =  p.indexOf(maxK);
                    if (a2 > -1) {
                        p.splice(a2, 1);
                    }
                    let axle = p[0];

                    this.cubeItem = undefined;

                    let direction = 0;

                    if (axle === 'x') {
                        let normalKV = point[normalK];
                        if ( (normalK === 'y' && normalKV < 0) || (normalK === 'z' && normalKV > 0) ) {
                            direction = maxDD > 0 ? 1 : 0;
                        } else {
                            direction = maxDD > 0 ? 0 : 1;
                        }
                    } else if (axle === 'y') {
                        let normalKV = point[normalK];
                        if ( (normalK === 'z' && normalKV < 0) || (normalK === 'x' && normalKV > 0) ) {
                            direction = maxDD > 0 ? 1 : 0;
                        } else {
                            direction = maxDD > 0 ? 0 : 1;
                        }
                    } else if (axle === 'z') {
                        let normalKV = point[normalK];
                        if ( (normalK === 'x' && normalKV < 0) || (normalK === 'y' && normalKV > 0) ) {
                            direction = maxDD > 0 ? 1 : 0;
                        } else {
                            direction = maxDD > 0 ? 0 : 1;
                        }
                    }

                    this.rotate(point, axle, direction);
                }
            }
        } else if (this.onMouseDown) {
            if (this.clientX !== undefined && this.clientY !== undefined) {
                // 向左为正，向右为负
                let dx = this.clientX - clientX;
                // 向上为正，向下为负
                let dy = this.clientY - clientY;

                // console.log('hfghjkfghjkfghjkfghjkfghjk');
                // console.log(`${this.angle1} + ${dx} / window.innerWidth * 2 * Math.PI = ${this.angle1 + dx / window.innerWidth * 2 * Math.PI}`);
                // console.log(`${this.angle2} + ${dy} / window.innerWidth * 2 * Math.PI = ${this.angle2 + dy / window.innerWidth * 2 * Math.PI}`);

                this.drx = (this.angle1 + dx / window.innerWidth * 2 * Math.PI);
                this.dry = (this.angle2 + dy / window.innerHeight * 2 * Math.PI);

                let {x, y, z} = this.cameraPosition(this.drx, this.dry);

                this.camera.position.x = x;
                this.camera.position.y = y;
                this.camera.position.z = z;

                this.camera.lookAt(0, 0, 0);

                this.renderer.clear();
                this.renderer.render(this.scene, this.camera);
            }
        }
    }

    _onMouseUp = (e)=>{
        this.cubeItem = undefined;
        this.onMouseDown = false;
        this.clientX = undefined;
        this.clientY = undefined;

        this.ccccccc = true;


        if (this.drx !== undefined) {
            this.angle1 = this.drx;
        }
        if (this.dry !== undefined) {
            this.angle2 = this.dry;
        }
    }

    render() {
        return (
            <div id='canvas-frame' style={{
                width: window.innerWidth,
                height: window.innerHeight,
            }} 
            onMouseDown={(e)=>{
                this._onMouseDown(e);
            }} 
            onMouseMove={(e)=>{
                this._onMouseMove(e);
            }} 
            onMouseUp={(e)=>{
                this._onMouseUp(e);
            }} 

            onTouchStart={(e)=>{
                this._onMouseDown(e.nativeEvent.touches[0]);
            }}
            onTouchMove={(e)=>{
                this._onMouseMove(e.nativeEvent.touches[0]);
            }}
            onTouchEnd={(e)=>{
                this._onMouseUp(e.nativeEvent.touches[0]);
            }}
            >
            </div>
        )
    }
}