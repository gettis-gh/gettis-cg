export class Camera {
  constructor(cameraElement, cameraSpace, visualElements) {
    this.cmrElement = cameraElement;
    this.cmrSpace = cameraSpace;
    this.vsElements = visualElements;
  }
  
  update({x, y, z, rad, zoom}) {
    while (this.cmrSpace.firstChild) {
      this.cmrSpace.removeChild(this.cmrSpace.firstChild);
    }

    const screen = document.querySelector('.screen');
    const width = screen.clientWidth;
    const height = screen.clientHeight;
    
    screen.setAttribute("width", width);
    screen.setAttribute("height", height);

    const cx = width / 2;
    const cy = height / 2;
    const deg = rad * (180 / Math.PI);
        
    this.cmrElement.setAttribute("transform", `
      translate(${cx} ${cy})
      scale(${1 / zoom})
      rotate(${-deg-180})
      translate(${-x*2} ${-y*2})
    `);

    this.vsElements.forEach((sourceElement, index) => {
      const entity = window.world[index];
      if (!entity) return;
        
      const worldX = entity.state?.position?.x || 0;
      const worldY = entity.state?.position?.y || 0; // altura
      const worldZ = entity.state?.position?.z || 0;
      const baseScale = 1;
        
      // Nuevo: factor relativo a la cámara
      const relativeY = worldY + z;
      const heightFactor = Math.pow(2, relativeY * 0.02);
      const visualScale = baseScale * heightFactor;

      // Opacidad: va de 1 (si está por debajo o igual que la cámara) a menor si está por encima
      let opacity = 1;
      if (relativeY > 0) {
        // Puedes ajustar este divisor para controlar qué tan rápido cae la opacidad
        opacity = Math.max(0.2, 1 - relativeY * 0.05);
      }
        
      // Clonar el <g> sin modificar el original
      const clone = sourceElement.cloneNode(true);
        
      // Aplicar transformación: posición en (X,Z), escala por Y
      clone.setAttribute("transform", `
        translate(${worldX * heightFactor}, ${worldZ * heightFactor})
        scale(${visualScale})
      `);

      clone.setAttribute("opacity", opacity.toFixed(2));
        
      this.cmrSpace.appendChild(clone);
    });        
  }
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function initCamera() {
  let visualElements = [];
    
  const cameraSpace = document.getElementById('camera-space');
  const cameraElement = document.getElementById('camera');
  const camera = new Camera(cameraElement, cameraSpace, visualElements);

  const cameraState = {
    x: 0,
    y: 0,
    z: 0,
    rad: 0,
    zoom: 0, 
  }
}