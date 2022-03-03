import * as React from 'react';

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
        </div>;
    // );
// }
export default Home;
