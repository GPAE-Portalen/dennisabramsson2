import React, { Suspense, lazy, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { IData } from './interfaces';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Project = lazy(() => import('./pages/Project'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const DataContext: React.Context<IData> = React.createContext({
    welcome: {
        title: 'Adaptable\nCooperative\nCurious',
        frontImage: {
            name: 'projects/me',
            type: 'png',
            alt: 'Front picture',
        },
        blogs: [
            {
                title: 'Welcome to my portfolio!',
                paragraphs: [
                    "My name is Dennis Abramsson and I'm currently a student at Futuregames, a higher vocational school. I'm a video game enthusiast and have been playing games for as long as I can remember so when the opportunity to learn how to create games arose, I jumped on it.",
                    "I started out learning how Unity works and familiarized myself with C# syntax in the beginning of 2019. After a few months I was able to produce the worksample that got me accepted into Futuregames and I haven't looked back since. It's just something about how coding a program feels. How ones emotions changes when a program crashes, into the joy when you get it to work. The best part though by far is that it feels like I'll always be able to learn something new.",
                    "During my time at Futuregames my knowledge about Unity and C# has grown immensely. I've also learned a lot working with both Unreal Engine and C++. At the I'm time writing this I've been able to create 4 games in collaboration with fellow students from other disciplines. You can some of them under the projects tab.",
                ],
                showBody: true,
                links:
                    [
                        {
                            href: "https://drive.google.com/file/d/1Cq_z4cgn-3ZzVNPptJv6Rcwx_cxBZ47f/view?usp=sharing",
                            btnText: "CV",
                        }

                    ],
            }
        ]
    },
    projects: [
        {
            id: '2cbdb7fb-4404-424c-858e-7706796b9ba3',
            path: '/project/bahari',
            name: 'Bahari',
            description: "My first team project working in Unreal Engine.",
            thumbnailFile: {
                name: 'projects/bahari/5',
                type: 'png',
                alt: 'Bahari',
            },
            iframe: {
                src: 'https://www.youtube.com/embed/bpsRmvPrPB8'
            },
            fullWidth: false,
            asides: [
                {
                    title: 'Project Information',
                    paragraphs: [
                        "Tools used: Unreal Engine, Visual Studio, C++, Perforce",
                        "Role: Programmer",
                        "Team Size: 14",
                        "Project Time: 4 weeks",
                        "Summary: Bahari, an atmospheric single player adventure game focusing on exploration and photography. You control our main character, a free diver whose passion for underwater photography will take you to discover the beautiful depths of the sea.",
                    ],
                    links:
                        [
                            {
                                href: "https://sailorsimba.itch.io/bahari",
                                btnText: "Download (From Itch.io)",
                            }

                        ],
                    chatBubble: false,
                }
            ],
            blogs: [
                {
                    title: "My Contribution",
                    paragraphs: [
                        "During this project my main responsibility was our photo mechanic. The goal was to allow the player to take photos in game and later look at them through an user interface. The system also needed to be able to tell if the picture taken was a collectable or not as those photos needed to be treated in another way.",
                        "Creating this proved to be quite a challange for me. Still being very new to programming in general and then getting thrown in to work with Unreal and C++ which I was less experienced with. This was my second game project at Futuregames and was made about a year before I write this so with that said, the code that you will see represented here is not the one I wrote for Bahari. I refactored it soley to be able to show it here as I think my skills have improved too much to show a year old project and be satisfied with it. "
                    ],

                },
                {
                    title: "The First Photo",
                    paragraphs: [
                        "My first thought of an solution was to use screenshots. The idea was that if I can grab a screenshot on player input, then I could save it somewhere accessible and then load it into the game as needed. While I was looking into different ways of taking screenshots in Unreal and loading images as textures I stumbled onto Unreals SceneCapture.",
                        "The scene capture is a camera that can via a render target paint it's viewport onto a material. Great! At this time I was pretty sure I found a good solution, and started looking into how I could build a system around these components that would allow for several pictures to be taken and saved.",
                        "So to create a photo I primarily needed 3 things. A SceneCaptureComponent, a TextureRenderTarget and a Material. The material had to have a TextureSample connected like so: (See MaterialExample)",
                        "With that material as base, I can later create a Dynamic instance of that material and override the texture sample with a new RenderTarget. This was the only way I could find that would allow me to updated materials during runtime.",
                    ],
                    hiddenIMG: {
                        name: 'projects/bahari/Material',
                        type: 'png',
                        alt: 'MaterialExample',
                    },
                },
                {
                    title: "The Process of Creating a Photo",
                    paragraphs: [
                        "Since I now knew what I needed to take a photo I set up a base class that would function as a individual photo and hold all information needed. My plan was that a manager could then instantiate this class whenever the player took a photo. The original class had all 3 aforementioned parts needed for the photo in this class, but as I was rewriting the code I realized that I don't need a SceneCapture camera for every photo. I can just use one for all photos and switch out the TextureTarget to a new TextureRender. Thus I removed the SceneCapture from the PhotoClass and put it in the manager instead.",
                        "I also tried pushing togeter the photo class and manager class, but found that I had some troubles getting it to display correctly if I didn't create a Dynamic instance material for each photo. That dynamic instance also needed to be created from a unique Static mesh component otherwise it just overwrote previous photos, making each one look the same.",
                    ],
                    buttonName: "PhotoClass",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611748515-566078871.html",
                },
                {
                    title: "The Manager",
                    paragraphs: [
                        "The managers purpose was to take photos, keep track of all photos taken, mark which ones are of a colletable object and display them onto a UI. Originally this class had 15 functions to achieve it's purpose. After looking over it qucikly I realized that most of them was not needed and spent a day refactoring it. I was able to break it down to 5 functions and still keep all relevant functionality while moving out some that didn't make sense, like hiding unknown widget elements and counting score.",
                        "The PhotoManager is meant to be used by a widget to display photos and for them to work togheter we need to do some setup in the widget first. The widget itself must keep track of a page number and have an array of images that can be used to display the photos taken in game. When we have that ready we simply need to get a reference to the PhotoManager in game and call it's ShowPage function passing in the pageNumber and images. Passing in page 0 would show us the photos marked as collectables while pages 1 or greater will show our photos in the order they were taken. The PhotosPerPage variable inside the manager must be set to the same amount of images we use in the widget.",
                    ],
                    buttonName: "PhotoManagerClass",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611756898-713094963.html",
                },
                {
                    title: "Credits to Team 4!",
                    thumbnailFile: {
                        name: "projects/bahari/credits",
                        type: "png",
                        alt: "Team4"
                    }
                }


            ]
        },
        {
            id: '677d7fd1-5928-453a-a3cc-69d015ec294c',
            path: '/project/ecs',
            name: "Hope",
            description: "ECS driven engine with focus on data oriented design.",
            thumbnailFile: {
                name: 'projects/ecs/codeTalk',
                type: 'jpg',
                alt: 'ecs game'
            },
            fullWidth: false,
            asides: [
                {
                    title: 'Project Information',
                    paragraphs: [
                        "Tools used: SDL2, Visual Studio, C++, Github",
                        "Team Size: Solo",
                        "Project Time: undefined",
                        "Summary: Hope is a personal project where I aim to learn more about data oriented design by building a Entity Component System. As of writing this I have spent around 2 weeks on this project and I plan to keep working on it as time presents itself.",
                    ],
                    chatBubble: false
                },
            ],
            blogs: [
                {
                    title: "About the Project",
                    paragraphs: [
                        "When I first started this project I knew barely anything about data oriented design. To get an idea of what I was getting myself into I was looking at talks from Scott Myers and Mike Acton along with researching about computer memory and cpu caches. I quickly realized that it was a lot to learn and that I needed to limit my scope if I would have anything to show for this portfolio.",
                        "In Scott Meyers talk about 'Cpu Caches and Why You Care' he mentiones that traveling lineraly through memory in either direction is the most cache friendly you can do. That would mean that a normal array should be one of the best data containers to use when designing a data oriented program.",
                        "Furthermore I also wanted to try to break out data and functonality, as before this I have only worked in an object oriented way where these two are closly knit together. To achieve this I felt like building an entity component system based on arrays would be a good start."
                    ]
                },
                {
                    title: "ECS",
                    paragraphs: [
                        "My ECS is defined by three things: ",
                        "Entities: An int value. Used as an array index to read and write to components.",
                        "Components: Structs of plain old data. Stores the data to be used in systems.",
                        "Systems: Loops through a set of entities and performs instructions on certain components.",
                    ]
                },
                {
                    title: "Entity",
                    paragraphs: [
                        "As mentioned before an entity is just a simple number. We will later use it to find components that we need to work on, but first I need to introduce components.",

                    ],
                    buttonName: "EntityExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611757098-2038165946.html",
                },
                {
                    title: "Components",
                    paragraphs: [
                        "Components, as mentioned earlier are just structs of data. When I create a new component I assign it a ComponentID. That ID is used in conjuction with a bitset called ComponentList that has the same amount of bits as the max amount of components I can register. If a bit would be set it can serve as a indication that a player has a certain component.",
                        "So if we register the Position component, that would get ID 0. We can then check if any entities has set the first bit in their ComponentList to serve as an indication on what entities have a position component.",
                    ],
                    buttonName: "ComponentExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611757323-1298821387.html",
                },
                {
                    title: "Entity Manager",
                    paragraphs: [
                        "Since an Entity only is a number we need a manager that extend their functionality. The manager is in charge of creating new entities. This is done by instantiating a queue and filling it will all availble entities. When we want to create a new entity we simply pop the first number in the queue and if we destroy one we simply put it's number at the back of the queue to be reused later in the programs lifetime.",
                        "The Entity Manager also keeps track on what components an entity has. This is done by keeping an array of ComponentLists, where each array index corresponds to an entity ID. So index 0 would be entity 0's component list."
                    ],
                    buttonName: "EntityManagerExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611757537-1890977612.html",
                },
                {
                    title: "Component Array",
                    paragraphs: [
                        "So I've talked a bit about what components are and how we figure out if a player has a component or not, but how do we store and access them?",
                        "The Component Array is a templated class so it can story any type of component. It derives from an empty parent class so that a manager can store all arrays in the same array even though they have different types by saving a pointer to the parent class.",
                        "The array is structured just like my other arrays. The index corresponds to an entity to show that it's that entity's component. One problem with this is that I will always have a full array. For example, if I have MAX_ENTITIES set to 500 and I register a new component, let us pretend it's the position component shown earlier. The array will then be filled with 500 position components to ensure every entity can equip a position component, even if I only use 1. A benefit with this is that I will always have a packed array that I don't need to restructure.",
                    ],
                    buttonName: "ComponentArrayExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611757685-1251019295.html",
                },
                {
                    title: "Component Manager",
                    paragraphs: [
                        "The component manager is used to register components, add, remove and fetch them from entities. It also keeps track of all componentArrays by storing them in an array with a pointer to their empty parent class.",
                        "We're storing a shared pointer to the parent class so we can store all component arrays in the same place. The array index corresponds to a component ID. So our Position component would have index 0 as it was the first component we registered. We can then get array index 0 and do a pointer cast to a component array of type position to get our array of positions. This means that we always need to declare what component we are trying to read/write to. Since all this is done with templated functions, a call to get a specific component would be something along the lines of 'componentManager->GetComponent<Position>(entity) which I think is very readable.",
                    ],
                    buttonName: "ComponentManagerExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611757848-1418595021.html",
                },
                {
                    title: "Systems and Their Manager",
                    paragraphs: [
                        "So now that we have structured or data in a way that allows for easy access, how do we handle instructions?",
                        "In ECS instructions are usually done by Systems. A system in this case would take a set of entities and iterate through them to give each a set of instructions.",
                        "To ensure all systems have a set of entities to iterate through I made a parent class that holds a set of entities. A System will then derive from this class and implement public functions that will be used during runtime.",
                        "My SystemManager keeps a a shared pointer to all registered systems in an unordered map, where the key is the systems type. By storing the component list of each system in a similar fashion I am able to compare an entity's component list to a systems. If the entity has all the components the systems asks for, the entity will be registered in it's set, if not the entity will not be included in the set."
                    ],
                    buttonName: "SystemManagerExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611757988-986442964.html",

                },
                {
                    title: "Coordinator",
                    paragraphs: [
                        "The ECS foundation is now more or less ready, but it's not very intuative to use. In the example below you can see all calls needed to add a component to an entity.",
                        "In an attempt to make the system more intuative to use I created a Coordinator class that functions as a wrapper for the ECS foundation. By implementing this class, the call to add a component went from the picture below to this : 'coordinator->AddComponent<Position>(entity, Position{})'. Now that is a lot easier to use."

                    ],
                    buttonName: "AddComponentExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611758192-870776325.html",
                },
                {
                    title: "How to use it?",
                    paragraphs: [
                        "So now that we have everything set up, how do we use it?",
                        ""
                    ],
                    buttonName: "UseExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611758753-1222208655.html",
                },
                {
                    title: "What's Next?",
                    paragraphs: [
                        "I have some ideas on what to work on next. Next in line is: ",
                        "Removing the inheritance from Systems, and possible remove the SystemManager as a whole. Instead I could replace it with global functions. To do this I need to figure out a way to fetch a container of entities to iterate over along with passing in a reference to my coordinator so I can edit those entities and their data from inside the global function. I would also need to define how I fill the container with entities to ensure that we only work on the correct ones.",
                    ]
                }
            ]
        },
        {
            id: '677d7fd1-5928-453a-a3cc-79d015ec294c',
            path: '/project/the-unmoored',
            name: 'The Unmoored',
            description: "Made during stay at home orders-",
            thumbnailFile: {
                name: 'projects/the-unmoored/5',
                type: 'png',
                alt: 'The Unmoored'
            },
            iframe: {
                src: 'https://www.youtube.com/embed/QdiV5Ir1ivY'
            },
            fullWidth: false,
            asides: [
                {
                    title: 'Project Information',
                    paragraphs: [
                        "Tools used: Unity Engine, Visual Studio, C#, Perforce, Miro",
                        "Role: Programmer, Scrum Master",
                        "Team Size: 10",
                        "Project Time: 7 weeks",
                        "Summary: Unmoored is a first-person puzzle and adventure game made in Unity for PC. The game explores the dark and enigmatic story of Alexandra McCarter, a freelance journalist in the early 1900s, and her atmospheric journey through a tropical island filled with both mystery and suspicion.",
                    ],
                    chatBubble: false
                }
            ],
            blogs: [
                {
                    title: "The Foundation",
                    paragraphs: [
                        "The Unmoored is a story driven puzzle game built around one simple mechanic. The players ability to interact with objects. We wanted to keep the gameplay rather simplistic so we could focus on telling a story.",
                        " If our only mechanic is the players ability to interact, we would need a lot of objects that would do different things when the player interacts with them. To achive that goal I needed a way to create unique interactions for every object, but have a general definition so one call works for any object the player interacted with. I decided to use an abstract class, instead of an interface, as I believed that the objects needed to share some functionalities. ",
                        "In hindsight I believe using an interface would have been better as I later found out that they didn't need to share any functionalities."

                    ],
                    buttonName: "InteractExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611759254-935606658.html",

                },
                {
                    title: "ItemObjects",
                    paragraphs: [
                        "Our first puzzle idea was a rather simplistic one. Find a key, pick it up, unlock a door. But as the ideas evolved it was apparent that we would need some kind of system that would function as an inventory for the player.",
                        "As we had talked a lot about the narrative I wanted the inventory system and its items to complement the story. I also aimed for it to be easy for other people to create new items as needed.",
                        "In an attempt to allow items to build upon the story I left room for a few lines of flavour text for all items and made the base class inherit from ScriptableObject to ensure it would be easy to create a new item.",
                        "The base class is called ItemObject and is shown below. It contains all the information needed for an item to work with the inventory system I built. PuzzleItem then derives from ItemObject and uses the CreateAssetMenu attribute to allow for easy creation from Unitys asset folder. In retrospective ItemObject did not need to be an abstract class. I could have simply removed PuzzleItem from the code base and added the CreateAssetMenu attribute to ItemObject directly. The reasoning behind putting it as an abstract class was that I initially had an idea that Story and Puzzle Items would behave differently.",
                        "To create a new item one simply needed to duplicate the existing Item prefab and assign it an ItemObject. The ItemObject itself can be created by right clicking in the asset folder, just as any new object. Since the ItemObjects saves as an asset, it can easily be reused on several game objects and allows for easy top level changes to descriptions and general apperence in game without having to leave the inspector.",

                    ],
                    buttonName: "ItemsCode",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611759591-1688556121.html",
                },
                {
                    title: "Inventory",
                    paragraphs: [
                        "The Inventory derives from ScriptableObject just like ItemObjects. I chose to do so to make it easier to create different inventories. Those inventories could be used to store things in a chest, or give another character than the player the ability to hold items. In the actual game we only have one use case for it, which is the player inventory. As such it didn't need much functionality. The class itself only holds a list of ItemObjects and two main functions, one to add items to the list and one to check if the inventory has a specific item. If we have assigned a UI, it also ensures it gets updated when an items gets added to the inventory.",

                    ],
                    buttonName: "InventoryCode",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611760129-1655350718.html",
                },
                {
                    title: "Dialogue",
                    paragraphs: [
                        "A requirement for our project was to create a few characters that live in our game world. To give them some life we wanted the living to be able to talk to the player. Thus I started on a dialogue system that would allow for that.",
                        "Since we had to limit the scope we decided that we would keep the branching of conversations to a maximum of 3. Meaning that on any given conversation, the player would have between  1-3 different answers as a response.",
                        "In the example below you can see how I have structured the Dialogue class and how it looks when created in Unity. Sentances functions as the first thing another character would say to the player. The player then gets the opportunity to choose between 1-3 answers to give as a response. A response is then connected to that player answer. That response is just a new dialogue, which allows for the creation of deeper conversations my chaining together several dialogues. In the example below -  Answer: 'You can call me Alex..' would connect to Response: '1accept_2'. If an answer is not connected to a response it would simply treat it as a goodbye and end the conversation.",
                        "To convert the information onto a UI I created a manager which would pick up a dialogue to play through an event, it would then display the information as seen below.",
                        "If I had more time I would have like improved on this system by making a custom editor script. My idea is that I could paint up the branching of dialogues like a tree so it's easier to see which dialogues connect to which.",
                    ],
                    buttonName: "DialogueExample",
                    codeEmbed: "https://www.thebra.se/externals/tools/thebrahighlight/embeds/1611760401-69818691.html",
                    hiddenIMG: {
                        name: "projects/the-unmoored/editorView",
                        type: "png",
                        alt: "EditorandInGameView"
                    },
                },
                {
                    title: "Credits to Team 8",
                    thumbnailFile: {
                        name: "projects/the-unmoored/team",
                        type: "png",
                        alt: "TeamMembers"
                    },
                }
            ]
        },
        //{
        //    id: '677d7fd1-5928-453a-a3cc-79d015ec295c',
        //    path: '/project/snake',
        //    name: 'Snake with A* driven movement',
        //    description: "This project is a replication of the famous Snake game with a AI driven snake that uses A* pathfinding to make it's way to the food.",
        //    thumbnailFile: {
        //        name: 'projects/snake/thumbnail',
        //        type: 'png',
        //        alt: 'A* Snake'
        //    },
        //    iframe: {
        //        src: 'https://www.youtube.com/embed/zKOY2J29YKo'
        //    },
        //    fullWidth: false,
        //    asides: [
        //        {
        //            title: 'Project Information',
        //            paragraphs: [
        //                "Tools used: Unity Engine, Visual Studio, C#, Github",
        //                "Team Size: 1",
        //                "Project Time: 4 weeks",
        //                "Summary: This project was made as a school project were the main goal was to recreate the Snake game using a single linked list. The bonus goal was adding an AI which goal was to find the food and go to it through the use of A* pathfiniding.",

        //            ],
        //            chatBubble: false
        //        },
        //    ],
        //    blogs: [
        //        {
        //            title: 'Video',
        //            paragraphs: [
        //                "The video linked is a showcase of the pathing for the snake.",
        //                "Red tiles are the snakes body and is deemed unpassable. It will do everything in it's power to avoid stepping on those tiles.",
        //                "Green tiles are the drawn path that the snake is on. The last piece being it's target tile.",
        //            ],
        //        },
        //        {
        //            title: "Tile/SinglyLinkedList",
        //            paragraphs: [
        //                "The first two code snippets you can see on the left side is my implementation of a single linked list.",
        //                "The Tile class is just a simple struct that keeps all the information we need to build the list.",
        //                "My SinglyLinkedList class is the actual implemention of the list. It is later used in game to handle the Snakes movement. To handle the movement I simply move the first object in the list one step in the right direction. I then get the last object in the list, which is why I saved it as a variable, and place it right behind the head.",
        //                "That way I am able to produce a result where the snake is moving fluidly without having to move every single body part."
        //            ],
        //            hiddenIMG: {
        //                name: "projects/snake/"
        //            }
        //        },
        //        {
        //            title: "Node/FindPath",
        //            paragraphs: [
        //                "The last two snippets are from my implementation of the A* algorithm.",
        //                "The node class is structured similar to the Tile class. It contains the data necessary to calculate the path.",
        //                "FindPath, as the name suggest, is the actual fuction that calculates the path from the start position to the target position. If the target node is found and there is a clear path to it we retrace our steps and add every node to a list. I then reverse the list which results in having a data container I can iterate through to know the next movement for the snake.",
        //                "If no clear path can be found I created logic for the snake to try to survive a bit longer in hope that a path would open up as the snake continues to move. To do this I simply made the snakes tail walkable and put it as the target node for finding a path. Which results in the snake following itself untill a path can be found.",
        //                "If neither the the original target node or the tail can be found the snake will check the closest nodes to see which is walkable and go to it. This gives the snakes a few extra movements in hope of finding a path. If it doesn't find a path it will hit eventually hit a wall or collide with itself trigger the loosing condition."
        //            ]
        //        }
        //    ]
        //},
        {
            id: '842d1d8d-5fef-49d5-a8a9-794b61f7d35e',
            path: '/project/in-between/',
            name: 'In Between',
            description: "Made during stay at home orders",
            fullWidth: false,
            thumbnailFile: {
                name: 'projects/in-between/altar',
                alt: 'In Between',
                type: 'png'
            },
            iframe: {
                src: 'https://www.youtube.com/embed/j4_2VheEmvU?list=PL8E3158rsFGsHedwHJEcSfT0B7z1fdXGN'
            },
            asides: [
                {
                    title: 'Project Information',
                    paragraphs: [
                        "Tools used: Unreal Engine, Visual Studio, C++, Github, Unreal Blueprints, Miro",
                        "Role: Programmer",
                        "Team Size: 10",
                        "Project Time: 4 weeks",
                        "Summary: In Between is a first-person puzzle-game that plays out in between the planes of Paradise and Despair, also know as Limbo. Limbo is a place of uncertainty. Only souls who couldn't be judged ends up here. Where they are given a second chance to reach Paradise. To be deemed worthy to open the door to Paradise and enter, you must complete a set of puzzles. Just make sure you do it quick, the plane of Despair is not known for their patience when collecting lost souls.",

                    ],
                    chatBubble: false
                }
            ],
            blogs: [
                {
                    title: "About the Project",
                    paragraphs: [
                        "In Between was planned and created during a 4 week period while most, if not all, team members worked remote. We were tasked to take inspiration for both the gameplay and the art syle from Bosch's painting: The Garden of Earthly Delights. We leaned towards a biblical interpretation, where the left side would depict Garden of Eden and symbolize heaven. While the right side would be hell.",
                        "After a bit of brainstorming our idea of playing the game in a Limbo state, between heaven and hell was borned. The idea was that the puzzles would work as tests for the player. If successful, they are rewarded with enternal bliss. If not, they get dragged to hell.",
                    ],
                    hiddenIMG: {
                        name: "projects/in-between/theme",
                        type: "png",
                        alt: "GardenOfDelights"
                    }
                },
            ]
        },
        {
            id: '842d1d8d-5fef-49d5-a8a9-794b61f7d55e',
            path: '/project/skull-patrol/',
            name: 'Skull Patrol',
            description: "My first game created as team",
            fullWidth: false,

            thumbnailFile: {
                name: 'projects/skull-patrol/Menuu',
                alt: 'Skull Patrol',
                type: 'png'
            },
            iframe: {
                src: 'https://www.youtube.com/embed/59Xo-saWrFs'
            },
            asides: [
                {
                    title: 'Project Information',
                    paragraphs: [
                        "Tools used: Unity, Visual Studio, C#, Perforce",
                        "Role: Programmer",
                        "Team Size: 6",
                        "Project Time: 2 weeks",
                        "Summary: Skull Patrol is a co-op action arcade game, where the goal is for you and a friend to fight off skeletons and their leader, the Summoner, and top the high score list. ",

                    ],
                    chatBubble: false
                }
            ],
            blogs: [
                {
                    title: "About the Project",
                    paragraphs: [
                        "Skull Patrol is a co-op action arcade game, where the goal is for you and a friend to fight off skeletons and their leader, the Summoner, and top the high score list.",
                        "The game does not have a definitive end. The only purpose is to get the highest possible score. The enemies become faster and tougher the further you progress, which is what creates the real challenge.  In order to reach your dream score, it is important to communicate with your friend to strategically plan your moves. The game has a score multiplier that will continually double your points until any of the players take damage.",
                        "The skeletons are the core enemies of the game. The first player, controlling Officer Calcium, firstly must shoot the skeletons to trap them in bubbles. Then, the second player, controlling the tank, must shoot the bubbles to bits with their cannon.",
                        "When you and your friend finally gain 1000 points, the boss called The Summoner appears. This enemy requires better communication to beat since it has new elements, separating it from the skeleton enemies. He will continue appearing when you reach higher scores as well, with even tougher attacks.",
                    ]
                },
            ]

        },
    ],
    socials: [
        //{
        //    ikon: {
        //        name: 'github-brand',
        //        type: 'svg',
        //        alt: 'github',
        //    },
        //},
        {
            ikon: {
                name: 'linkedin',
                type: 'svg',
                alt: 'linkedin',
            },
            href: "https://www.linkedin.com/in/dennis-abramsson-73aa68177/",
        }
    ],
    contactBlogs: [
        {
            title: "",
            paragraphs: [""],
        }
    ]
} as IData);

const App = (): JSX.Element => {
    return (
        <Fragment>
            <Header />

            <main className="flex-grow-1">
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/projects" component={Projects} />
                        <Route path="/project/:projectName" component={Project} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Suspense>
            </main>

            <Footer />
        </Fragment>
    );
};

export default App;
