import React, { Suspense, useState, useEffect, Fragment, useContext } from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
    IData,
    IDataProject,
    IDataProjectsBlog,
    IDataProjectLink
} from '../interfaces';

import { DataContext } from '../App';

import { Spinner } from '../components/Spinner';

interface IProjectRouteProps {
    projectName: string;
};

export default function Project(props: RouteComponentProps<IProjectRouteProps>): JSX.Element {
    const data: IData = useContext(DataContext);

    const [project, setProject] = useState<IDataProject>({} as IDataProject);
    const [render, setRender] = useState<boolean>(false);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        if (data.projects) {
            data.projects.forEach((project: IDataProject) => {
                if (window.location.pathname === project.path) {
                    setProject(project);
                    setRender(true);
                } else if (data.projects && data.projects.indexOf(project) === data.projects.length) {
                    setIsNotFound(true);
                }
            });
        }
    }, [data]);

    const RoutedProject = (): JSX.Element => (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route path={props.match.url} render={() => <ProjectContent {...project} />} />
            </Switch>
        </Suspense>
    );

    if (isNotFound) return <Redirect to='/NotFound' />;

    if (render) return <RoutedProject />;
    else return <Fragment></Fragment>;
};



const ProjectContent = (project: IDataProject): JSX.Element => {
    const weHaveDisplays: boolean = (project.iframe !== null || project.thumbnailFile !== null);

    const IFrame = (): JSX.Element => {
        return (
            <Fragment>
                {
                    project.iframe &&
                    <div className="IFrame card box-shadow-2 overflow-hidden">
                        <div className="ratio ratio-16x9">
                            <iframe src={project.iframe.src} title="YouTube video" allowFullScreen></iframe>
                        </div>
                    </div>
                }
            </Fragment>
        );
    };

    return (
        <div className="ProjectContent bg-light">
            <Helmet>
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={project.name} />
                <meta property="og:description" content={project.description} />
            </Helmet>

            <div className="container p-3">
                <h1 className="display-1 my-4 text-center">{project.name}</h1>

                <div className="row">
                    {
                        weHaveDisplays &&
                        <Fragment>

                            <div className={`${project.fullWidth ? 'col-12' : 'col-lg-8'}`}>
                                {
                                    project.iframe && <IFrame />
                                }
                                {
                                    !project.iframe && project.thumbnailFile &&
                                    <LazyLoadImage
                                        alt={project.thumbnailFile.alt}
                                        src={`${process.env.PUBLIC_URL}/${project.thumbnailFile.name}.${project.thumbnailFile?.type}`}
                                        className="card-img-top"
                                    />
                                }
                            </div>

                            {
                                project.asides &&
                                <div className={`${project.fullWidth ? 'col-lg-6 py-4' : 'col-lg-4'}`}>
                                    {mapBlogs(project.asides, true)}
                                </div>
                            }
                        </Fragment>
                    }

                    {
                        project.blogs &&
                        <div className={`p-3 ${project.fullWidth ? 'col-lg-6 py-4' : 'col-12'} ${(!project.asides && project.fullWidth) ? 'col-lg-12' : ''}`}>
                            <div className={`card box-shadow-2 bg-light ${project.fullWidth ? '' : 'mt-4'}`}>
                                {project.blogs && mapBlogs(project.blogs)}


                            </div>
                        </div>
                    }
                </div>
            </div >
        </div >
    );
};

export const mapBlogs = (blogs: IDataProjectsBlog[], aside?: boolean): JSX.Element[] => {
    return blogs.map((blog: IDataProjectsBlog): JSX.Element => {
        const firstBlog: boolean = blogs.indexOf(blog) === 0;
        const chatBubble = ((blog.title || blog.paragraphs || blog.links) && blog.chatBubble);
        const normalBlog: boolean = !aside;
        const lastNormalBlog: boolean = (normalBlog && (blogs.indexOf(blog) === blogs.length - 1))

        const mapParagraphs = (paragraphs: string[]) => paragraphs.map((paragraph: string) => {
            return (
                <p key={paragraphs.indexOf(paragraph)} className="card-text">{paragraph}</p>



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
            <Fragment key={blogs.indexOf(blog)}>
                {
                    (normalBlog && !firstBlog) &&
                    <hr />
                }

                <article className={`mt-4 ${blog.chatBubble ? 'card box-shadow-2' : ''} ${(firstBlog || normalBlog) ? 'mt-lg-0' : ''}`}>

                    <div className={`${(normalBlog || chatBubble) ? 'card-body ' : ''} ${((normalBlog && firstBlog) ? 'mt-2' : '')}`}>
                        {
                            blog.title && normalBlog && <h3 className="card-title">{blog.title}</h3>
                        }

                        {
                            blog.title && !normalBlog && <h5 className="card-title">{blog.title}</h5>
                        }
                        {
                            blog.thumbnailFile && <img src={`${process.env.PUBLIC_URL} /${blog.thumbnailFile.name}.${blog.thumbnailFile?.type}`} className="card-img-top" alt={blog.thumbnailFile.alt} />

                        }

                        {
                            blog.paragraphs && mapParagraphs(blog.paragraphs)
                        }

                        {
                            blog.links && mapLinks(blog.links)
                        }

                        {
                            (blog.createdAt || blog.updatedAt) &&
                            <div className="row">
                                {
                                    blog.updatedAt &&
                                    <small className="card-text text-muted mt-2 col-auto">Last updated: {blog.updatedAt}</small>
                                }

                                {
                                    blog.createdAt &&
                                    <small className="card-text text-muted mt-2 col-auto">Created: {blog.createdAt}</small>
                                }
                            </div>
                        }

                        {
                            !aside && blog.codeEmbed && blog.buttonName &&
                            <div className="card box-shadow-2">
                                <div className="card-header">
                                    <h3 className="mb-0">
                                        <button type="button" className="btn fw-bold text-primary" data-bs-toggle="collapse" data-bs-target={`#${blog.buttonName}`} aria-expanded="false" aria-controls={`${blog.buttonName}`}>
                                            {`${blog.buttonName}`}
                                            <small className="text-muted">&#9;Show more</small>
                                        </button>
                                    </h3>
                                </div>

                                <div id={`${blog.buttonName}`} className="collapse">
                                    <div className="card-body">
                                        <iframe src={`${blog.codeEmbed}`} className="w-100" height="315" />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            !aside && blog.hiddenIMG &&
                            <div className="card box-shadow-2">
                                <div className="card-header bg-white">
                                    <h3 className="mb-0">
                                        <button type="button" className="btn fw-bold text-primary" data-bs-toggle="collapse" data-bs-target={`#${blog.buttonName}`} aria-expanded="false" aria-controls={`${blog.buttonName}`}>
                                            {`${blog.hiddenIMG.alt}`}
                                        </button>
                                    </h3>
                                </div>

                                <div id={`${blog.buttonName}`} className="collapse">
                                    <div className="card-body">
                                        <LazyLoadImage
                                            alt={blog.hiddenIMG.alt}
                                            src={`${process.env.PUBLIC_URL}/${blog.hiddenIMG.name}.${blog.hiddenIMG?.type}`}
                                            className="card-img-top"
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </article>

                {
                    lastNormalBlog &&
                    <br />
                }
            </Fragment>
        );
    });
};