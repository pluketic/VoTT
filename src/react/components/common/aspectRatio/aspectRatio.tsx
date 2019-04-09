import React from "react";

export interface IAspectRatioProps extends React.Props<AspectRatio> {
    ratio: string;
    maxWidth?: number;
    maxHeight?: number;
}

export class AspectRatio extends React.Component<IAspectRatioProps> {
    private container: React.RefObject<HTMLDivElement> = React.createRef();
    private interval?: number = null;

    public componentDidMount() {
        this.interval = window.setInterval(this.resize, 100);
    }

    public componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    }

    public render() {
        return (<div ref={this.container} className="maintain-aspect-ratio">{this.props.children}</div>);
    }

    private resize = (): void => {

    }
}
