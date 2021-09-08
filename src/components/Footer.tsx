import React, { useContext, Fragment } from 'react';

import {
    IData,
    IDataProjectsBlog,
    IDataProjectLink
} from '../interfaces';

import { DataContext } from '../App';

import { mapSocials } from './Header';

export const Footer = (): JSX.Element => {
    const data: IData = useContext(DataContext);

    return (
        <Fragment>
            <footer id="Footer" className="Footer bg-white border-top">
                <div className="container p-3 text-center">
                    <div className="d-flex flex-column align-items-center p-4">
                        <h1 id="front-title" className="display-1 mb-4 text-center">Contacts</h1>

                        {
                            data.contactBlogs &&
                            <div style={{ maxWidth: '600px' }}>
                                {
                                    mapBlogs(data.contactBlogs)
                                }
                            </div>
                        }

                        <a href="mailto:dennis.abramsson@futuregames.nu" className="my-3">
                            dennis.abramsson@futuregames.nu
                        </a>

                        {
                            data.socials &&
                            <div className="mt-3" style={{ maxWidth: '600px' }}>
                                {
                                    mapSocials(data.socials)
                                }
                            </div>
                        }
                    </div>
                </div>
            </footer>

            <div className="bg-light">
                <div className="container p-3 text-center">
                    &copy; All rights reserved
                </div>
            </div>
        </Fragment>
    );
};

export const mapBlogs = (blogs: IDataProjectsBlog[]): JSX.Element[] => blogs.map((blog: IDataProjectsBlog) => {
    const mapParagraphs = (paragraphs: string[]) => paragraphs.map((paragraph: string) => {
        return (
            <p key={paragraphs.indexOf(paragraph)}>{paragraph}</p>
        );
    });

    const mapLinks = (links: IDataProjectLink[]) => links.map((link: IDataProjectLink) => {
        const notFirstLink: boolean = links.indexOf(link) !== 0;

        return (
            <a key={links.indexOf(link)} href={link.href} className={`btn btn-primary ${notFirstLink ? 'ms-2' : ''}`} target="_blank" rel="noopener noreferrer">
                {link.btnText}
            </a>
        );
    });

    return (
        <article key={blogs.indexOf(blog)}>
            {
                blog.thumbnailFile && <img src={`${process.env.PUBLIC_URL}/${blog.thumbnailFile.name}.${blog.thumbnailFile?.type}`} className="card-img-top" alt={blog.thumbnailFile.alt} />
            }

            <h4>{blog.title}</h4>

            {
                blog.paragraphs && mapParagraphs(blog.paragraphs)
            }

            {
                blog.links && mapLinks(blog.links)
            }
        </article>
    );
});