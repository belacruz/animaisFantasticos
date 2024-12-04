export default function initTooltip() {
  const tooltips = document.querySelectorAll("[data-tooltip]");

  if (tooltips) {
    tooltips.forEach((item) => {
      item.addEventListener("mouseover", onMouseOver);
    });

    function onMouseOver(event) {
      const tooltipBox = criarTooltipBox(this);

      onMouseMove.tooltipBox = tooltipBox;
      this.addEventListener("mousemove", onMouseMove);

      onMouseLeave.tooltipBox = tooltipBox;
      onMouseLeave.element = this;
      this.addEventListener("mouseleave", onMouseLeave);
    }

    const onMouseLeave = {
      handleEvent() {
        this.tooltipBox.remove();
        this.element.removeEventListener("mouseleave", onMouseLeave);
        this.element.removeEventListener("mousemove", onMouseMove);
      },
    };

    const onMouseMove = {
      handleEvent(event) {
        this.tooltipBox.style.top = event.pageY + 6 + "px";
        this.tooltipBox.style.left = event.pageX + 6 + "px";
      },
    };

    function criarTooltipBox(e) {
      const tooltipBox = document.createElement("div");
      const text = e.getAttribute("aria-label");
      tooltipBox.classList.add("tooltip");
      tooltipBox.innerText = text;
      document.body.appendChild(tooltipBox);
      return tooltipBox;
    }
  }
}
