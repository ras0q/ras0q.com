import { useEffect, useRef } from "preact/hooks";

type Props = {
  leftID: string;
  rightID: string;
  curve?: number;
};

export const Connector = ({ leftID, rightID, curve = 50 }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const fit = (left: HTMLElement, right: HTMLElement) => {
    if (!svgRef.current || !pathRef.current) return;

    const { scrollX, scrollY } = window;
    const leftRect = left.getBoundingClientRect();
    const rightRect = right.getBoundingClientRect();
    const lx = scrollX + leftRect.right;
    const ly = scrollY + leftRect.top + leftRect.height / 2;
    const rx = scrollX + rightRect.left;
    const ry = scrollY + rightRect.top + rightRect.height / 2;
    const viewLeft = Math.min(lx, rx);
    const viewTop = Math.min(ly, ry);
    const w = Math.max(Math.abs(rx - lx), 1);
    const h = Math.max(Math.abs(ry - ly), 1);
    svgRef.current.setAttribute(
      "viewBox",
      `${viewLeft}, ${viewTop}, ${w}, ${h}`,
    );
    svgRef.current.style.left = `${viewLeft}px`;
    svgRef.current.style.top = `${viewTop}px`;
    svgRef.current.style.width = `${w}px`;
    svgRef.current.style.height = `${h}px`;

    pathRef.current.setAttribute(
      "d",
      `M ${lx}, ${ly} C ${lx + curve}, ${ly}, ${
        rx - curve
      }, ${ry}, ${rx}, ${ry}`,
    );
  };

  useEffect(() => {
    const leftEL = document.querySelector<HTMLElement>(`#${leftID}`);
    const rightEL = document.querySelector<HTMLElement>(`#${rightID}`);
    if (!leftEL || !rightEL) return;

    const observer = new MutationObserver(() => fit(leftEL, rightEL));
    observer.observe(leftEL, { attributes: true, characterData: true });
    observer.observe(rightEL, { attributes: true, characterData: true });

    const resizeObserver = new ResizeObserver(() => fit(leftEL, rightEL));
    resizeObserver.observe(document.body);
    resizeObserver.observe(leftEL);
    resizeObserver.observe(rightEL);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [leftID, rightID, curve]);

  return (
    <svg
      ref={svgRef}
      version="1.1"
      style={{ position: "absolute", overflow: "visible" }}
    >
      <path
        ref={pathRef}
        style={{
          fill: "none",
          stroke: "var(--ctp-latte-text)",
          strokeWidth: "0.25rem",
        }}
      />
    </svg>
  );
};
