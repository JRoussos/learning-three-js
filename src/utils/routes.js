import { lazy } from 'react';

const ColorShift = lazy( () => import('../colorShift/ColorShift') );
const Fake3D = lazy( () => import('../fake3d/Fake3D') );
const Dots = lazy( () => import('../dots/Dots') );
const Kinetic = lazy( () => import('../kineticTypography/kineticTypography') );

const routes = [
    {
        path: 'fake_3d',
        name: 'Fake 3D Effect',
        title: 'Fake 3D effect with the use of a depth map.',
        component: <Fake3D/>
    },
    {
        path: 'color_shift',
        name: 'Color Shift',
        title: 'rgb shift effect on mouse over.',
        component: <ColorShift/>
    },
    {
        path: 'dots_matrix',
        name: 'Matrix of Dots',
        title: 'Matrix of dots moving in space with custom animation.',
        component: <Dots/>
    },
    {
        path: 'kinetic_typo',
        name: 'Kinetic Typography',
        title: 'Mixing motion and text in an cool animation.',
        component: <Kinetic/>
    }
]

export default routes