/**
 * Created by elvischen on 28/02/2017.
 */
function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
    });
    renderer.setClearColor(0x000000);// set the background color to black
    var scene = new THREE.Scene();

    var camera = new THREE.OrthographicCamera(-8,8,6,-6,5,20);
    camera.position.set(8,6,10);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    var cube = new THREE.Mesh(new THREE.SphereGeometry(3,18,12),
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
