/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import { ReactNode, useCallback, useMemo, useState, MouseEvent, KeyboardEvent, CSSProperties, useRef } from "react";
import { createPortal } from "react-dom";
import { usePopper, StrictModifier } from "react-popper";
import { PositioningStrategy } from "@popperjs/core/lib/types";
import { Placement } from "@popperjs/core/lib/enums";
import styled, { keyframes } from "styled-components/macro";

import useOnMouseDownOutside from "src/hooks/useOnMouseDownOutside";
import useVariableRef from "src/hooks/useVariableRef";

const PopperInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Content = styled.div`
  animation: ${PopperInAnimation} 0.2s ease-out;
`;

type Trigger = "click" | "hover";

export interface PopperProps {
  content: ReactNode;
  children?: ReactNode;
  isOpen?: boolean;
  trigger?: Trigger;
  placement?: Placement;
  strategy?: PositioningStrategy;
  useClickOutside?: boolean;
  disabled?: boolean;
  offsetX?: number;
  offsetY?: number;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  onOpen?(): void;
  onClose?(): void;
}

export default function Popper({
  content,
  children,
  isOpen: propsIsOpen,
  trigger = "click",
  placement,
  strategy,
  useClickOutside = true,
  disabled,
  offsetX,
  offsetY,
  zIndex = 999,
  className,
  style,
  onOpen,
  onClose,
}: PopperProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [innerStateIsOpen, setInnerStateIsOpen] = useState(false);

  const modifiers: StrictModifier[] = [{ name: "offset", options: { offset: [offsetX, offsetY] } }];
  const { styles, attributes } = usePopper(referenceElement, popperElement, { modifiers, placement, strategy });

  const popperElementStyle = useMemo<CSSProperties>(
    () => ({
      ...styles.popper,
      zIndex,
      visibility: attributes.popper?.["data-popper-reference-hidden"] && !propsIsOpen ? "hidden" : "visible",
    }),
    [attributes.popper, styles.popper, zIndex, propsIsOpen],
  );

  const isControlled = propsIsOpen !== undefined;
  const isOpen = propsIsOpen ?? innerStateIsOpen;

  const open = useCallback(
    (openTrigger: Trigger) => {
      if (disabled || openTrigger !== trigger) return;
      isControlled ? onOpen?.() : setInnerStateIsOpen(true);
    },
    [onOpen, trigger, disabled, isControlled],
  );

  const close = useCallback(
    (closeTrigger: Trigger) => {
      if (closeTrigger !== trigger) return;
      isControlled ? onClose?.() : setInnerStateIsOpen(false);
    },
    [isControlled, onClose, trigger],
  );

  const clickTriggerToggle = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      if (trigger !== "click") return;
      e.stopPropagation();
      isOpen ? close("click") : open("click");
    },
    [trigger, isOpen, close, open],
  );

  const hoverCloseTimeoutRef = useRef(-1);

  const hoverTriggerOpen = useCallback(() => {
    clearTimeout(hoverCloseTimeoutRef.current);
    open("hover");
  }, [open]);

  const hoverTriggerClose = useCallback(() => {
    hoverCloseTimeoutRef.current = window.setTimeout(() => {
      close("hover");
    }, 250);
  }, [close]);

  const onPopperElementClick = useCallback((e: MouseEvent) => e.stopPropagation(), []);

  useOnMouseDownOutside(useVariableRef(popperElement), (e) => {
    if (isOpen && trigger === "click" && useClickOutside) {
      const isInsidePopper = popperElement?.contains(e.target as Node);
      if (!isInsidePopper) {
        e.stopPropagation();
        close("click");
      }
    }
  });

  return (
    <>
      <div
        ref={setReferenceElement}
        role="button"
        tabIndex={-1}
        onMouseDown={clickTriggerToggle}
        onMouseOver={hoverTriggerOpen}
        onMouseOut={hoverTriggerClose}
        onFocus={hoverTriggerOpen}
        onBlur={hoverTriggerClose}
        style={{ ...styles.reference, ...style }}
        className={className}
      >
        {children}
      </div>

      {isOpen &&
        createPortal(
          <Content
            ref={setPopperElement}
            style={popperElementStyle}
            onClick={onPopperElementClick}
            onMouseOver={hoverTriggerOpen}
            onMouseOut={hoverTriggerClose}
            onFocus={hoverTriggerOpen}
            onBlur={hoverTriggerClose}
            {...attributes.popper}
          >
            {content}
          </Content>,
          document.body,
        )}
    </>
  );
}
