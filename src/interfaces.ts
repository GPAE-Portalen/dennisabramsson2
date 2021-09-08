

export interface IData {
    welcome: IDataWelcome;
    projects?: IDataProject[];
    socials?: IDataSocial[];
    contactBlogs?: IDataProjectsBlog[];
}

export interface IImageFile {
    name: string;
    type: string;
    alt: string;
    displayName?: string;
}



// Welcome
export interface IDataWelcome {
    title: string;
    frontImage?: IImageFile;
    blogs?: IDataProjectsBlog[];
}

export interface IDataDropDown {
    // drop down variables in here
    // then import in project
    // and implemnt at the latest accordion
    // possible on the first accordion too
}

// PROJECTS
export interface IDataProject {
    id: GUID;
    path: string;
    name: string;
    fullWidth?: boolean;
    description?: string;
    thumbnailFile?: IImageFile;
    iframe?: {  
        src: string;
    };
    asides?: IDataProjectsBlog[];
    blogs?: IDataProjectsBlog[];
}

export interface IDataProjectLink {
    href: string;
    btnText: string;
}

export interface IDataProjectsBlog {
    title?: string;
    thumbnailFile?: IImageFile;
    paragraphs?: string[];
    links?: IDataProjectLink[];
    chatBubble?: boolean;
    createdAt?: string;
    updatedAt?: string;
    showBody?: boolean;
    hiddenParagraphs?: string[];
    codeEmbed?: string;
    hiddenIMG?: IImageFile;
    buttonName?: string;
}


// SOCIALS
export interface IDataSocial {
    ikon: IImageFile;
    href?: string;
}


