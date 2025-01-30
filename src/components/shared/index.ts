"use client";

import dynamic from "next/dynamic";

export { default as Button } from "./button";
export { default as FingerspellImage } from "./fingerspellImage";
export { default as Icon } from "./icon";

const Modal = dynamic(() => import("./modal"), { ssr: false });
export { Modal };
