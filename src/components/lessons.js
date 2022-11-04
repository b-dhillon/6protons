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
        title: 'Fullerenes',
        text: FullerenesText,
        maxCounter: 6
    },
    {
        title: 'Nanotubes',
        text: NanotubeText,

    },
    {
        title: 'Diamonds',
        text: DiamondText,
    },
    {
        title: 'Graphenes',
        text: GrapheneText,
    }
]

export default lessons;