import { Button } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@components/theme';

const MainContainer: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <div
            className={`w-screen h-screen overflow-hidden ${isDarkMode ? 'bg-[#6b6b6b]' : 'bg-[#ededed]'}`}
        >
            <main
                className={`relative max-w-[1440px] mx-auto h-full overflow-scroll ${isDarkMode ? 'main-layout-dark' : 'main-layout'} p-6`}
            >
                <div className="w-full h-full">
                    <div className="w-full flex items-center justify-end mb-6">
                        <Button type="primary" onClick={toggleTheme}>
                            {isDarkMode
                                ? 'Switch to Light Mode'
                                : 'Switch to Dark Mode'}
                        </Button>
                    </div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainContainer;
