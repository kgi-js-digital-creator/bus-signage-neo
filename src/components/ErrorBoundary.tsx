import { Component, type ErrorInfo, type ReactNode } from "react";

import ErrorComponent from "./Error";


export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | unknown | null;
  errorInfo?: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  override componentDidMount(): void {
    window.addEventListener("error", this.handleGlobalError);
    window.addEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
  }

  override componentWillUnmount(): void {
    window.removeEventListener("error", this.handleGlobalError);
    window.removeEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
  }

  private handleGlobalError = (event: ErrorEvent): void => {
    console.error("Global window error caught:", event.error ?? event.message);
    this.setState({
      hasError: true,
      error: event.error ?? new Error(event.message),
    });
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
    console.error("Unhandled promise rejection caught:", event.reason);
    this.setState({
      hasError: true,
      error:
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason)),
    });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}
