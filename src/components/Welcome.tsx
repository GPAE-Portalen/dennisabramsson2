import React, { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
    IData,
    IDataProjectsBlog,
    IDataProjectLink
} from '../interfaces';

import { DataContext } from '../App';

export const Welcome = (): JSX.Element => {
    const data: IData = useContext(DataContext);

    return (
        <section className="Welcome py-5">
            <div className="container p-3">
                <div className="row">
                    <div className="col-xl-6">
                        {
                            data.welcome.frontImage &&
                            <LazyLoadImage
                                alt={data.welcome.frontImage.alt}
                                src={`${process.env.PUBLIC_URL}/${data.welcome.frontImage.name}.${data.welcome.frontImage.type}`}
                                className="d-block mx-auto mx-xl-0 ms-xl-auto w-100"
                                style={{ paddingTop: '35px' }}
                            />
                        }
                    </div>

                    <div className="col-xl-6 p-4 font-size-10px" >
                        {
                            data.welcome.title &&
                            <h1 id="front-title" className="display-1 mb-4 text-center" style={{ paddingBottom: '20px' }}>{data.welcome.title}</h1>
                        }

                        {
                            data.welcome.blogs && mapBlogs(data.welcome.blogs)
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export const mapBlogs = (blogs: IDataProjectsBlog[]): JSX.Element[] => blogs.map((blog: IDataProjectsBlog) => {
    const mapParagraphs = (paragraphs: string[]) => paragraphs.map((paragraph: string) => {
        return (
            <p key={paragraphs.indexOf(paragraph)} className="card-text">{paragraph}</p>
        );
    });

    const mapLinks = (links: IDataProjectLink[]) => links.map((link: IDataProjectLink) => {
        const notFirstLink: boolean = links.indexOf(link) !== 0;

        return (
            <a key={links.indexOf(link)} href={link.href} className={`btn btn-primary ${notFirstLink ? 'ms-2' : ''}`} target="_blank" rel="noopener noreferrer" style={{ width: '200px' }}>
                {link.btnText}
            </a>
        );
    });

    return (
        <article key={blogs.indexOf(blog)} >
            {
                blog.thumbnailFile &&
                <LazyLoadImage
                    alt={blog.thumbnailFile.alt}
                    src={`${process.env.PUBLIC_URL}/${blog.thumbnailFile.name}.${blog.thumbnailFile?.type}`}
                    className="card-img-top"
                    style={{ height: '48px', width: '48px' }}
                />
            }

            <div className="">
                {
                    blog.showBody && <div className="text-center" >
                        {
                            blog.title &&
                            <h4 className="card-title">{blog.title}</h4>
                        }

                        {
                            blog.paragraphs && mapParagraphs(blog.paragraphs)
                        }

                        {
                            blog.links && mapLinks(blog.links)
                        }
                    </div>
                }
            </div>

        </article>
    );
});