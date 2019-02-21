import React, { Component, PropTypes } from "react";
import Lightbox from "react-images";

export default class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            photos: [],
            open: false
        };
    }

    closeLightbox() {
        this.setState({
            index: 0,
            open: false
        });
    }

    gotoPrevious() {
        this.setState({
            index: this.state.index - 1
        });
    }

    gotoNext() {
        this.setState({
            index: this.state.index + 1
        });
    }

    render() {
        const { photos, index, open } = this.state;
        const { onClose } = this.props;
        return (
            <Lightbox
                images={photos}
                onClose={() => {
                    this.closeLightbox();
                    if (onClose) {
                        onClose();
                    }
                }}
                onClickPrev={() => this.gotoPrevious()}
                onClickNext={() => this.gotoNext()}
                currentImage={index}
                isOpen={open}
            />
        );
    }
}
