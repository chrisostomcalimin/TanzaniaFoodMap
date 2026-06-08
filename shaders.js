const vertexShaderSource = `
attribute vec2 position;
attribute vec2 texCoord;

uniform float zoom;
uniform vec2 offset;

varying vec2 vTexCoord;

void main() {

    vec2 p = position;

    p = p * zoom;
    p = p + offset;

    gl_Position = vec4(
        p,
        0.0,
        1.0
    );

    vTexCoord = texCoord;
}
`;



const fragmentShaderSource = `
precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;

void main() {

    gl_FragColor =
        texture2D(
            uTexture,
            vTexCoord
        );

}
`;