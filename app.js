const canvas =
    document.getElementById(
        "glCanvas"
    );

const gl =
    canvas.getContext(
        "webgl"
    );

if (!gl) {

    alert(
        "WebGL not supported!"
    );

}


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


const renderer =
    new Renderer(gl);
    
    setupInteraction(
    canvas,
    renderer
);


function animate() {

    gl.clearColor(
        0.1,
        0.15,
        0.2,
        1
    );

    gl.clear(
        gl.COLOR_BUFFER_BIT
    );

    renderer.render();

    requestAnimationFrame(
        animate
    );
}

animate();