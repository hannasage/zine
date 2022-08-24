import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface TemplateErrorBoundaryState {
  hasError: boolean;
}

const initState: TemplateErrorBoundaryState = {
  hasError: false,
};

export default class TemplateErrorBoundary extends React.Component<
  Props,
  TemplateErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = initState;
  }

  static getDerivedStateFromError(error: Error): TemplateErrorBoundaryState {
    // Parse incoming error and return updated TemplateErrorBoundaryState.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Parse incoming error and console.warn/console.error as needed
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
