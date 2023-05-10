import {useRoutes} from 'react-router-dom';
import Homepage from '../pages/Homepage';
import PostMovie from '../pages/PostMovie';
import DetailMovie from '../pages/DetailMovie';
import Movies from '../pages/Movies';


export default function Router() {
    return useRoutes(
        [
            {
                path: '',
                element: <Homepage/>
            },
            {
                path: '/movies',
                element: <Movies/>
            },
            {
                path: '/detail-movie/:id',
                element: <DetailMovie/>
            },
            {
                path: '/post-movie',
                element: <PostMovie/>
            }
        ]
    );
}