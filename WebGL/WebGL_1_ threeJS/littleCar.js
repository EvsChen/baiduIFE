/**
 * Created by elvischen on 28/02/2017.
 */
function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
    });
    renderer.setClearColor(0x000000);// set the background color to black
    var scene = new THREE.Scene();

    var camera = new THREE.OrthographicCamera(-20,20,15,-15,10,100);
    camera.position.set(-40,10,30);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    var cube = new THREE.Mesh(new THREE.CubeGeometry(10,10,20),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })
    );
    var torus = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })
    );

    var torus2 = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })
    );

    var torus3 = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })
    );

    var torus4 = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })
    );

    torus.rotation.set(0,90,0);
    torus.position.set(-5,-5,5);
    torus2.rotation.set(0,90,0);
    torus2.position.set(-5,-5,-5);
    torus3.rotation.set(0,90,0);
    torus3.position.set(5,-5,-5);
    torus4.rotation.set(0,90,0);
    torus4.position.set(5,-5,5);

    // cube.position.set(-7,-5,0);

    scene.add(cube);
    scene.add(torus);
    scene.add(torus2,torus3,torus4);

    renderer.render(scene,camera);
}