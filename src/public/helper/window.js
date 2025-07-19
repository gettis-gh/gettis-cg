let windowElement = null;

export function initWindowSystem() {
  document.addEventListener("click", (event) => {
    windowElement = event.target.closest(".window");
    if (!windowElement) return;

    const toolsElement = windowElement.querySelector(".tools");

    const elementTable = {
      header: windowElement.querySelector(".header"),
      minBtn: toolsElement?.querySelector("button:nth-child(1)"),
      fullBtn: toolsElement?.querySelector("button:nth-child(2)"),
      contentElement: windowElement.querySelector(".content"),
    };

    Object.keys(elementTable).forEach((key) => {
      const handler = windowAddHandlerTable[key];
      if (typeof handler === "function") {
        handler({
          element: elementTable[key],
          window: windowElement
        });
      }
    });
  });
}

const windowAddHandlerTable = {
    header: ({element, window}) => {
        let offsetX, offsetY, dragging = false;

        element.addEventListener("mousedown", (e) => {
            if (e.target.tagName === "BUTTON") return;
            if (window.classList.contains("fullscreen")) return;
            dragging = true;
            offsetX = e.clientX - window.offsetLeft;
            offsetY = e.clientY - window.offsetTop;
            document.body.style.cursor = "move";
        });

        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            window.style.left = (e.clientX - offsetX) + "px";
            window.style.top = (e.clientY - offsetY) + "px";
        });
    
        document.addEventListener("mouseup", () => {
            dragging = false;
            document.body.style.cursor = "default";
        });
    },
};

function minimize() {

}