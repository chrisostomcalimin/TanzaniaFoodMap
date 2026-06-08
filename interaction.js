function setupInteraction(canvas, renderer) {

    canvas.addEventListener(
        "wheel",
        (e)=>{

            e.preventDefault();

            if(e.deltaY > 0){

                renderer.zoom *= 0.9;

            }
            else{

                renderer.zoom *= 1.1;

            }

        }
    );



    let dragging = false;

    let previousX = 0;
    let previousY = 0;



    canvas.addEventListener(
        "mousedown",
        (e)=>{

            dragging = true;

            previousX = e.clientX;
            previousY = e.clientY;

        }
    );



    canvas.addEventListener(
        "mouseup",
        ()=>{

            dragging = false;

        }
    );



    canvas.addEventListener(
        "mousemove",
        (e)=>{

            if(!dragging)
                return;

            let dx =
                e.clientX - previousX;

            let dy =
                e.clientY - previousY;

            renderer.offsetX += dx / canvas.width * 2;

            renderer.offsetY -= dy / canvas.height * 2;

            previousX = e.clientX;
            previousY = e.clientY;

        }
    );

}