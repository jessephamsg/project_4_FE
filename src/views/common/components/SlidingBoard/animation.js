export default {
    animateBoardSlide (isShowing) {
        return {
            top: isShowing ? 50 : -1000,
            zIndex: 1,
            position: 'absolute',
            left: '0px',
            from: {
            top: -1000,
            }
        }
    }
}

