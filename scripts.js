function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


function addHoverEffect(event) {
    if (this.classList.contains("active")) {

        const color_value = this.style['background-color'];
        this.style['background-color'] = shadeColor(rgb2hex(color_value), -10);
        
    }
    else {
        this.classList.add("active");
        this.style['background-color'] = "#" + Math.floor(Math.random()*16777215).toString(16);
    }
    

}

function removeHoverEffect(tile) {
    tile.classList.remove("active");
}

function generateGrid(size) {

    const GRIDSIZE = 960;
    const container = document.querySelector(".container");

    //clearing container div
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        for (let j = 0; j < size; j++) {
            const container_div = document.createElement("div");
            
            container_div.classList.add("container-div");
            edge_size = GRIDSIZE / size;
            container_div.style.height = `${edge_size}px`;
            container_div.style.width = `${edge_size}px`;
    
            container_div.addEventListener("mouseover", addHoverEffect);
    
            row.appendChild(container_div);
        }
    
        container.appendChild(row);
    }
}


const button = document.querySelector(".clear-board");
button.onclick = () => {
    
    const board = document.querySelectorAll(".container-div");
    
    board.forEach((tile) => {
        removeHoverEffect(tile);
    });

    let new_grid_size = prompt("How big would you like your grid?"); 
    if (new_grid_size > 100) new_grid_size = 100;

    generateGrid(new_grid_size);


};

generateGrid(16);