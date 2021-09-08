import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { IData, IDataSocial } from '../interfaces';
import { DataContext } from '../App';

import { scrollTo } from '../scrollTo';

export const Header = (): JSX.Element => {
    const data: IData = useContext(DataContext);

    return (
        <header id="Header" className="Header">
            <div className="container py-2">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <NavLink to="/" className="navbar-brand">
                        Dennis Abramsson
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/" className="nav-link active text-center px-4 ms-lg-3 mt-lg-0" aria-current="page">
                                Home
                            </NavLink>
                            <NavLink to="/projects" className="nav-link text-center px-4 mt-2 ms-lg-3 mt-lg-0">
                                Projects
                            </NavLink>
                            <button id="contact-btn-link" className="nav-link text-center px-4 mt-2 ms-lg-3 mt-lg-0" onClick={() => scrollTo('Footer')}>
                                Contacts
                            </button>
                        </div>

                        {
                            data.socials &&
                            <div className="container-fluid">
                                <div className="row align-items-center justify-content-center justify-content-lg-end">
                                    { mapSocials(data.socials) }
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        </header>
    );
};

export const mapSocials = (socials: IDataSocial[]) => {
    return socials.map((social) => {
        const { name, type, alt } = social.ikon;

        return (
            <a key={socials.indexOf(social)} href={social.href} target="_blank" rel="noopener noreferrer" className="col flex-grow-0 p-2">
                <img src={`${process.env.PUBLIC_URL}/${name}.${type}`} alt={alt} height="36px" />
            </a>
        );
    });
};