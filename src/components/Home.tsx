import * as React from 'react';
import Form from './Form';

// export interface IAppProps {

// }

type HomeProps = {
    name: string;
}

// export default function App(props: IAppProps) {
const Home = ({ name }: HomeProps): JSX.Element => 
    // return (
        <div className="text-light text-center">
            {name}
            <Form />
        </div>;
    // );
// }
export default Home;
