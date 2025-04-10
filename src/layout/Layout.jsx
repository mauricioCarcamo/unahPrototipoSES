import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
    return (
        <>
            <div className="flex h-screen ">
                <Sidebar />

                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Contenido dinámico */}
                    <Header />
                    <main className="flex-1 overflow-y-auto p-6 bg-gray-100 text-gray-900">
                        <Outlet />
                    </main>
                    <Footer />
                </div>

            </div>

        </>
    );
}
