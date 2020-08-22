export default {
    animateBoardSlide (isShowing) {
        return {
            top: isShowing ? 0 : -1000,
            zIndex: 1,
            position: 'absolute',
            from: {
            top: -1000,
            }
        }
    }
}

