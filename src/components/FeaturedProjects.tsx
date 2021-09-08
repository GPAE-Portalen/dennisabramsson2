import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
    IData,
    IDataProject,
} from '../interfaces';

import { DataContext } from '../App';

import { scrollTo } from '../scrollTo';

export const FeaturedProjects = (): JSX.Element => {
    const data: IData = useContext(DataContext);

    const featuredProjectsQuantity: number = process.env.REACT_APP_FEATURED_PROJECTS_QUANTITY
        ? parseInt(process.env.REACT_APP_FEATURED_PROJECTS_QUANTITY, 10)
        : 3;

    return (
        <section className="FeaturedProjects">
            <div className="container p-3">
                <div className="d-flex justify-content-center mb-5">
                    <div className="triangle-bottomrightx"></div>

                    <div className="d-flex align-items-center">
                        <h1 className="display-3 text-center m-0 px-4 mt-5">Featured projects</h1>
                    </div>

                    <div className="triangle-topleftx"></div>
                </div>


                <div className="d-flex flex-column">
                    <div className="row justify-content-center">
                        {data.projects && mapProjects(data.projects, featuredProjectsQuantity)}
                    </div>

                    <NavLink to="/projects" className="btn btn-lg btn-primary my-5 mx-auto fw-bold" onClick={() => scrollTo('Header')}>
                        Browse all
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export const mapProjects = (projects: IDataProject[], projectsQuantity?: number): (JSX.Element | undefined)[] => {
    return projects.map((project: IDataProject): JSX.Element | undefined => {
        const { id, path, name, description, thumbnailFile } = project;

        while (projects.indexOf(project) < (projectsQuantity ? projectsQuantity : projects.length)) {
            return (
                <div key={id} className="col-xl-4 col-lg-6 mb-4">
                    <article className="card">
                        {
                            thumbnailFile &&
                            <LazyLoadImage
                                alt={thumbnailFile.alt}
                                src={`${process.env.PUBLIC_URL}/${thumbnailFile.name}.${thumbnailFile.type}`}
                                className="card-img-top"
                            />
                        }

                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>

                            {
                                description && <p className="card-text text-truncate text-nowrap">{description}</p>
                            }

                            <NavLink to={path} className="btn btn-primary stretched-link">
                                Full details
                            </NavLink>
                        </div>
                    </article>
                </div>
            );
        }
    });
};
