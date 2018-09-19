import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

class ColorPicker extends React.Component {
    state = {
        displayColorPicker: false,
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    }

    render() {
        const { color, colorChange } = this.props
        const styles = reactCSS({
        'default': {
            warp: {
                height: '40px',
                display:'flex',
                alignItems: 'center'
            },
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                backgroundColor: color,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '1000',
                top:40,
                left:60
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
        });
        return (
            <div style={styles.warp}>
                <div style={styles.swatch} onClick={this.handleClick}>
                <div style={styles.color} />
                </div>
                {
                    this.state.displayColorPicker ?
                    <div style={styles.popover}>
                        <div
                            style={styles.cover}
                            onClick={this.handleClose}
                        />
                        <ChromePicker
                            color={color}
                            onChange={colorChange}
                        />
                    </div> : null
                 }
            </div>
        )
    }
}

export default ColorPicker
