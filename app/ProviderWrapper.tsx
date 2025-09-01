"use client";

import { Provider } from "react-redux";
import { store } from "../apoAuth/store";
import { ReactNode } from "react";

interface ProviderWrapperProps {
  children: ReactNode;
}

export default function ProviderWrapper({ children }: ProviderWrapperProps) {
  return <Provider store={store}> {children} </Provider>;
}