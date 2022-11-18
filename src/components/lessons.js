import FullerenesText from '../pages/fullerenes_lesson/FullereneText';
// import FullerenesModels from '../../FullereneModels';

import NanotubeText from '../pages/fullerenes_lesson/FullereneText';
// import NanotubeModels from '../../FullereneModels';

import DiamondText from '../pages/fullerenes_lesson/FullereneText';
// import DiamondModels from '../../FullereneModels';

import GrapheneText from '../pages/fullerenes_lesson/FullereneText';
// import GrapheneModels from '../../FullereneModels';


const lessons = [
    {
        id: 'fullerenes',
        title: 'Fullerenes',
        text: FullerenesText,
        maxCounter: 6
    },
    {
        id: 'nanotubes',
        title: 'Nanotubes',
        text: NanotubeText,

    },
    {
        id: 'diamonds',
        title: 'Diamonds',
        text: DiamondText,
    },
    {
        id: 'graphenes',
        title: 'Graphenes',
        text: GrapheneText,
    }
]

export default lessons;