/**
 * Created by elvischen on 28/02/2017.
 */
function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
    });
    renderer.setClearColor(0x000000);// set the background color to black
    var scene = new THREE.Scene();

    width = 800;
    height = 600;


    //Camera

    var camera = new THREE.OrthographicCamera(-20,20,15,-15,10,100);
    camera.position.set(-40,20,30);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);


    //Geometries



    var cube = new THREE.Mesh(new THREE.CubeGeometry(10,10,20),
        new THREE.MeshLambertMaterial({
            color: 0xcccccc
        })
    );


    var torus = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshLambertMaterial({
            color: 0xcccccc
        })
    );

    var torus2 = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshLambertMaterial({
            color: 0xcccccc
        })
    );

    var torus3 = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshLambertMaterial({
            color: 0xcccccc
        })
    );

    var torus4 = new THREE.Mesh(new THREE.TorusGeometry(1.5,0.5,16,18),
        new THREE.MeshLambertMaterial({
            color: 0xcccccc
        })
    );

    var table = new THREE.Mesh(new THREE.CubeGeometry(100,30,100),
        new THREE.MeshLambertMaterial({
            color: 0x00ffff
        })
    );
    table.position.y = -21.5;
    scene.add(table);

    torus.rotation.set(0,90,0);
    torus.position.set(-5.8,-4.5,5);

    torus2.rotation.set(0,90,0);
    torus2.position.set(-5.8,-4.5,-5);

    torus3.rotation.set(0,90,0);
    torus3.position.set(5,-4.5,-5);

    torus4.rotation.set(0,90,0);
    torus4.position.set(5,-4.5,5);

    scene.add(cube,torus,torus2,torus3,torus4);


    // Light Condition

    var light = new THREE.SpotLight(0xffffff, 0.8, 500, Math.PI / 4, 25);
    light.position.set(-40,30,10);
    light.target = cube;
    scene.add(light);


    var ambientLight = new THREE.AmbientLight(0xffffff,0.4);
    scene.add(ambientLight);

    renderer.shadowMapEnabled = true;
    cube.castShadow = true;
    cube.receiveShadow = true;
    torus.castShadow = true;
    torus2.castShadow = true;
    torus3.castShadow = true;
    torus4.castShadow = true;
    torus.receiveShadow = true;
    light.castShadow = true;
    table.receiveShadow = true;

    light.shadowCameraNear = 2;
    light.shadowCameraFar = 10;
    light.shadowCameraFov = 30;
    light.shadowCameraVisible = true;

    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    light.shadowDarkness = 0.5;

    renderer.shadowMapSoft = true;


    // Render
    renderer.render(scene,camera);
}