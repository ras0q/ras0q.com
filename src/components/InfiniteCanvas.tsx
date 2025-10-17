import { batch, computed, useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { css } from "../styled-system/css/index.mjs";

type Props = {
  children: ComponentChildren;
  centerID?: string;
};

export const InfiniteCanvas = ({ children, centerID }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const translateX = useSignal(0);
  const translateY = useSignal(0);
  const scale = useSignal(1);
  const orientationX = useSignal(0);
  const orientationY = useSignal(0);
  const initialOrientationX = useSignal<number | null>(null);
  const initialOrientationY = useSignal<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const abortController = new AbortController();
    el.addEventListener("pointerdown", () => {
      const pointerAbortController = new AbortController();
      document.addEventListener("pointermove", (e: PointerEvent) => {
        batch(() => {
          translateX.value += e.movementX;
          translateY.value += e.movementY;
        });
      }, { signal: pointerAbortController.signal });

      document.addEventListener("pointerup", () => {
        pointerAbortController.abort("pointerup");
      }, {
        signal: pointerAbortController.signal,
        once: true,
      });
    }, { signal: abortController.signal });

    el.addEventListener("wheel", (e: WheelEvent) => {
      const zoom = -Math.sign(e.deltaY); // 1: zoom in, -1: zoom out
      if (
        (zoom === 1 && scale.value >= 10.0) ||
        (zoom === -1 && scale.value <= 0.5)
      ) {
        return;
      }

      e.preventDefault();

      const rect = el.getBoundingClientRect();
      const newScale = Math.round(scale.value * 100 + 5 * zoom) /
        100;

      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      batch(() => {
        translateX.value += pointerX * (1 / newScale - 1 / scale.value);
        translateY.value += pointerY * (1 / newScale - 1 / scale.value);
        scale.value = newScale;
      });
    }, { signal: abortController.signal });

    return () => {
      abortController.abort("unmount");
    };
  }, []);

  useEffect(() => {
    if (!centerID) return;

    const el = ref.current;
    const resizerEL = resizerRef.current;
    const centerEL = document.getElementById(centerID);
    if (!el || !resizerEL || !centerEL) return;

    const rect = el.getBoundingClientRect();
    const centerRect = centerEL.getBoundingClientRect();
    translateX.value = (rect.width - centerRect.width) / 2 +
      rect.left - centerRect.left;
    translateY.value = (rect.height - centerRect.height) / 2 +
      rect.top - centerRect.top;

    const transitionAbortController = new AbortController();
    resizerEL.style.transition = "transform 0.5s ease";
    resizerEL.addEventListener("transitionend", () => {
      resizerEL.style.transition = "";
    }, { signal: transitionAbortController.signal });

    // Disable drag and drop
    resizerEL.querySelectorAll("a,img").forEach((child) => {
      if (child instanceof HTMLElement) {
        child.draggable = false;
      }
    });
  }, [centerID]);

  const grantDeviceOrientation = useCallback(async () => {
    if (!DeviceOrientationEvent) return;

    if (
      "requestPermission" in DeviceOrientationEvent &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      // @ts-ignore: requestPermission is not defined now.
      await DeviceOrientationEvent.requestPermission().catch((e) => alert(e));
    }

    // @ts-ignore: deviceorientation event is not defined now.
    addEventListener(
      "deviceorientation",
      (e: DeviceOrientationEvent) => {
        if (e.gamma === null || e.beta === null) return;
        if (
          initialOrientationX.value === null ||
          initialOrientationY.value === null
        ) {
          initialOrientationX.value = e.gamma;
          initialOrientationY.value = e.beta;
          return;
        }

        if (Math.abs(e.gamma - orientationX.value) < 45) {
          orientationX.value = e.gamma - initialOrientationX.value;
        }
        if (Math.abs(e.beta - orientationY.value) < 90) {
          orientationY.value = e.beta - initialOrientationY.value;
        }
      },
    );
  }, []);

  // TODO: use better names
  const sumTranslateX = computed(() =>
    translateX.value + orientationX.value * 5
  );
  const sumTranslateY = computed(() =>
    translateY.value + orientationY.value * 5
  );

  return (
    <div
      ref={ref}
      class={css`
        --bg-size: 16px;
        --bg-position: 0px 0px;

        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background-image:
          linear-gradient(
            0deg,
            transparent calc(var(--bg-size) - 1px),
            var(--colors-surface0) var(--bg-size)
          ),
          linear-gradient(
          90deg,
          transparent calc(var(--bg-size) - 1px),
          var(--colors-surface0) var(--bg-size)
        );
        background-size: var(--bg-size) var(--bg-size);
        background-position: var(--bg-position);
      `}
      style={{
        "--bg-size": `${16 * scale.value}px`,
        "--bg-position": `${sumTranslateX.value * scale.value}px ${
          sumTranslateY.value * scale.value
        }px`,
      }}
      onClick={grantDeviceOrientation}
    >
      <div
        ref={resizerRef}
        class={css`
          --translate: 0px, 0px;
          --scale: 1;

          transform: translate(var(--translate)) scale(var(--scale));
          transform-origin: 0 0;
          user-select: none;
        `}
        style={{
          "--translate": `${sumTranslateX.value * scale.value}px, ${
            sumTranslateY.value * scale.value
          }px`,
          "--scale": `${scale.value}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
