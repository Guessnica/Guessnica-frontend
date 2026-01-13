import React, { useState, useEffect } from 'react';

const ResponsiveWrapper = ({ children }) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            setWindowSize({
                width,
                height,
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024
            });
        };

        window.addEventListener('resize', handleResize);
        
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="responsive-wrapper" style={{ minHeight: '100vh' }}>
            {typeof children === 'function' ? children(windowSize) : children}
        </div>
    );
};

export default ResponsiveWrapper;
