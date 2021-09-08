import React from 'react';

import { Welcome } from '../components/Welcome';
import { FeaturedProjects } from '../components/FeaturedProjects';

export default function Home(): JSX.Element {
    return (
        <div id="Home">
            <Welcome />
            <FeaturedProjects />
        </div>
    );
};