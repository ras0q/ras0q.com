import { useEffect, useRef } from "preact/hooks";
import { css } from "../styled-system/css/index.mjs";

type Props = {
  // TODO: Can I use key instead of id?
  leftID: string;
  rightID: string;
  curve?: number;
};

export const Connector = ({ leftID, rightID, curve = 50 }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const fit = (parent: HTMLElement, left: HTMLElement, right: HTMLElement) => {
    if (!svgRef.current || !pathRef.current) return;

    const parentRect = parent.getBoundingClientRect();
    const leftRect = left.getBoundingClientRect();
    const rightRect = right.getBoundingClientRect();
    const lx = leftRect.right - parentRect.left;
    const ly = leftRect.top - parentRect.top +
      (leftRect.height - parentRect.height) / 2;
    const rx = rightRect.left - parentRect.left;
    const ry = rightRect.top - parentRect.top +
      (rightRect.height - parentRect.height) / 2;
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
    const parentEL = leftEL?.parentElement;
    if (
      !leftEL || !rightEL || !parentEL || parentEL !== rightEL.parentElement
    ) return;

    const observer = new MutationObserver(() => fit(parentEL, leftEL, rightEL));
    observer.observe(leftEL, { attributes: true, characterData: true });
    observer.observe(rightEL, { attributes: true, characterData: true });

    const resizeObserver = new ResizeObserver(() =>
      fit(parentEL, leftEL, rightEL)
    );
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
      class={css`
        position: absolute;
        overflow: visible;
      `}
    >
      <path
        ref={pathRef}
        class={css`
          fill: none;
          stroke: var(--colors-text);
          stroke-width: 0.25rem;
        `}
      />
    </svg>
  );
};
