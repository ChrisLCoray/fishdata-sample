import React from 'react';
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import Api from '../services/api.service';

const api = new Api;

export async function loader() {
    const fish = await api.getFishData();
    const regions = api.getRegions(fish);
    return {
        fish: fish,
        regions: regions
    };
}

export default function Root() {
    const data = useLoaderData();
    const navLinks = data.regions.map((region) => {
        return <li key={`nav-${region.toLowerCase().replace(/w/g, '_')}`}>
            <NavLink to={`locations/${region}`}>{region}</NavLink>
        </li>
    });
    return (
        <div className="app-container">
            <header>
                <h1>Find Fish</h1>
                <nav>
                    <ul>
                        <li><NavLink to={`/`}>Home</NavLink></li>
                        {navLinks}
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>Sample Application developed in React by Chris Coray</footer>
        </div>
    );
}
