import React from 'react';
import { useLoaderData } from "react-router-dom";
import Api from '../services/api.service';
import ListView from './listview';

const api = new Api;

export async function loader() {
    return { fish: await api.getFishData(), region: undefined };
}

export default function MainView() {
    const data = useLoaderData();
    return (
        <section className="view-container">
            <ListView data={data} />
        </section>
    );
}
