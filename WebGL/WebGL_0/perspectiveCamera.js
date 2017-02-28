/**
 * Created by elvischen on 28/02/2017.
 */
function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
    });
    renderer.setClearColor(0x000000);// set the background color to black
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(60,4/3,1,10);
    camera.position.set(0,0,5);
    scene.add(camera);

    var cube = new THREE.Mesh(new THREE.CubeGeometry(1,1,1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
    );

    scene.add(cube);
    renderer.render(scene,camera);
}/**
 * Created by elvischen on 28/02/2017.
 */
