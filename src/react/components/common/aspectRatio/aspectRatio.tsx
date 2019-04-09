import React from "react";
import { ISize } from "../../../../models/applicationState";

export interface IAspectRatioProps extends React.Props<AspectRatio> {
    ratio: number;
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
        if (!this.props.ratio) {
            return;
        }

        // Get size of parent container
        const containerSize = {
            width: this.container.current.parentElement.offsetWidth,
            height: this.container.current.parentElement.offsetHeight,
        };

        let elementSize: ISize;

        if (this.props.ratio >= 1) {
            // Landscape
            const width = this.props.maxWidth
                ? Math.max(containerSize.width, this.props.maxWidth)
                : containerSize.width;
            const height = width / this.props.ratio;
            elementSize = { width, height };
        } else {
            // Portrait
            const height = this.props.maxHeight
                ? Math.max(containerSize.height, this.props.maxHeight)
                : containerSize.height;
            const width = height * this.props.ratio;
            elementSize = { width, height };
        }

        this.container.current.style.width = `${elementSize.width}px`;
        this.container.current.style.height = `${elementSize.height}px`;
    }
}
