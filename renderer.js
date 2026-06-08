class Renderer {

    constructor(gl) {

        this.gl = gl;

        // camera
        this.zoom = 1.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;

        this.program = this.createProgram();

        // attributes
        this.positionLocation =
            gl.getAttribLocation(
                this.program,
                "position"
            );

        this.texCoordLocation =
            gl.getAttribLocation(
                this.program,
                "texCoord"
            );

        // uniforms
        this.zoomLocation =
            gl.getUniformLocation(
                this.program,
                "zoom"
            );

        this.offsetLocation =
            gl.getUniformLocation(
                this.program,
                "offset"
            );

        this.textureLocation =
            gl.getUniformLocation(
                this.program,
                "uTexture"
            );

        // vertex buffer
        this.buffer =
            gl.createBuffer();

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.buffer
        );

        // x y u v
        const vertices = [

            -1, -1, 0, 1,
             1, -1, 1, 1,
            -1,  1, 0, 0,

            -1,  1, 0, 0,
             1, -1, 1, 1,
             1,  1, 1, 0

        ];

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW
        );

        this.texture = null;

        this.loadTexture();
    }



    loadTexture() {

        const gl = this.gl;

        const image = new Image();

        image.src = "data/tanzania_map.png";

        image.onload = () => {

            console.log("Texture loaded");

            this.texture =
                gl.createTexture();

            gl.bindTexture(
                gl.TEXTURE_2D,
                this.texture
            );

            gl.pixelStorei(
                gl.UNPACK_FLIP_Y_WEBGL,
                true
            );

            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                image
            );

            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_MIN_FILTER,
                gl.LINEAR
            );

            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_MAG_FILTER,
                gl.LINEAR
            );

            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_S,
                gl.CLAMP_TO_EDGE
            );

            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_T,
                gl.CLAMP_TO_EDGE
            );

        };

    }



    createShader(type, source) {

        const shader =
            this.gl.createShader(type);

        this.gl.shaderSource(
            shader,
            source
        );

        this.gl.compileShader(
            shader
        );

        if (
            !this.gl.getShaderParameter(
                shader,
                this.gl.COMPILE_STATUS
            )
        ) {

            console.error(
                this.gl.getShaderInfoLog(
                    shader
                )
            );

        }

        return shader;
    }



    createProgram() {

        const gl = this.gl;

        const vertexShader =
            this.createShader(
                gl.VERTEX_SHADER,
                vertexShaderSource
            );

        const fragmentShader =
            this.createShader(
                gl.FRAGMENT_SHADER,
                fragmentShaderSource
            );

        const program =
            gl.createProgram();

        gl.attachShader(
            program,
            vertexShader
        );

        gl.attachShader(
            program,
            fragmentShader
        );

        gl.linkProgram(
            program
        );

        if (
            !gl.getProgramParameter(
                program,
                gl.LINK_STATUS
            )
        ) {

            console.error(
                gl.getProgramInfoLog(
                    program
                )
            );

        }

        return program;
    }



    render() {

        if (!this.texture)
            return;

        const gl = this.gl;

        gl.useProgram(
            this.program
        );

        gl.uniform1f(
            this.zoomLocation,
            this.zoom
        );

        gl.uniform2f(
            this.offsetLocation,
            this.offsetX,
            this.offsetY
        );

        gl.activeTexture(
            gl.TEXTURE0
        );

        gl.bindTexture(
            gl.TEXTURE_2D,
            this.texture
        );

        gl.uniform1i(
            this.textureLocation,
            0
        );

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.buffer
        );

        const stride =
            4 * Float32Array.BYTES_PER_ELEMENT;

        // position
        gl.enableVertexAttribArray(
            this.positionLocation
        );

        gl.vertexAttribPointer(
            this.positionLocation,
            2,
            gl.FLOAT,
            false,
            stride,
            0
        );

        // texture coordinates
        gl.enableVertexAttribArray(
            this.texCoordLocation
        );

        gl.vertexAttribPointer(
            this.texCoordLocation,
            2,
            gl.FLOAT,
            false,
            stride,
            2 * Float32Array.BYTES_PER_ELEMENT
        );

        gl.drawArrays(
            gl.TRIANGLES,
            0,
            6
        );

    }

}