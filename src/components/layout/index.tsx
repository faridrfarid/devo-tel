import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContainer: React.FC = () => {
    return (
        <div className="w-screen h-screen overflow-hidden bg-white">
            <main
                className={`relative max-w-[1440px] mx-auto h-full overflow-scroll bg-gray-50 p-6`}
            >
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainContainer;
