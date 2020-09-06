export default {
    animateBoardSlide (isShowing) {
        return {
            top: isShowing ? 65 : -2000,
            zIndex: 1,
            position: 'absolute',
            left: '0px',
            from: {
            top: -2000,
            }
        }
    }
}

