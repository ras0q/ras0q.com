import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

type Props = {
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  r2l?: boolean; // right to left?
  curve?: number;
};

export const Connector = ({ fromRef, toRef, r2l, curve = 50 }: Props) => {
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
    if (!fromRef.current || !toRef.current) return;

    const [left, right] = r2l
      ? [toRef.current, fromRef.current]
      : [fromRef.current, toRef.current];

    const observer = new MutationObserver(() => fit(left, right));
    observer.observe(left, { attributes: true, characterData: true });
    observer.observe(right, { attributes: true, characterData: true });

    const resizeObserver = new ResizeObserver(() => fit(left, right));
    resizeObserver.observe(document.body);
    resizeObserver.observe(left);
    resizeObserver.observe(right);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [fromRef, toRef, r2l, curve]);

  return (
    <svg
      ref={svgRef}
      version="1.1"
      style={{ position: "absolute", overflow: "visible", zIndex: -1 }}
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
