import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';


type FormProps = {

}

const Form = (): JSX.Element => {

    const [formState, setFormState] = useState({});
    const [results, setResults] = useState({});

    const instance = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:8000/api"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        setFormState({
            ...formState,
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        instance.post("/calculate", formState)
            .then(res => {
                console.log(res.data)
                setResults(res.data)
            })
    }

    return(
    <div className="my-4" style={{ maxWidth: "fit-content", margin: "auto" }}>
        <form onSubmit={handleSubmit} className="form text-light">
            <div className="d-flex flex-row justify-content-evenly form-component my-2">
                <label htmlFor="totalYears" className="form-label" style={{ margin: "auto", maxWidth: "200px" }}>
                    <p style={{ margin: "0" }}>Time Horizon</p>
                    <p style={{ margin: "0" }}>(years)</p>
                </label>
                <input onChange={handleChange} name="totalYears" type="text" className="form-control ms-5" style={{ maxWidth: "200px" }} />
            </div>
            <div className="d-flex flex-row justify-content-evenly form-component my-3">
                <label htmlFor="initialBalance" className="form-label" style={{ margin: "auto", maxWidth: "200px" }}>
                    <p style={{ margin: "0" }}>Current Number of Units</p>
                    <p style={{ margin: "0" }}>(coins, tokens, etc)</p>
                </label>
                <input onChange={handleChange} name="initialBalance" type="text" className="form-control ms-5" style={{ maxWidth: "200px" }} />
            </div>
            <div className="d-flex flex-row justify-content-evenly form-component my-3">
                <label htmlFor="monthlyDCA" className="form-label" style={{ margin: "auto", maxWidth: "200px" }}>
                    <p style={{ margin: "0" }}>Monthly Contribution</p>
                    <p style={{ margin: "0" }}>(DCA)</p>
                </label>
                <input onChange={handleChange} name="monthlyDCA" type="text" className="form-control ms-5" style={{ maxWidth: "200px" }} />
            </div>
            <div className="d-flex flex-row justify-content-evenly form-component my-3">
                <label htmlFor="currentPrice" className="form-label" style={{ margin: "auto", maxWidth: "200px" }}>
                    <p style={{ margin: "0" }}>Current Price</p>
                    <p style={{ margin: "0" }}>(future API)</p>
                </label>
                <input onChange={handleChange} name="currentPrice" type="text" className="form-control ms-5" style={{ maxWidth: "200px" }} />
            </div>
            <div className="d-flex flex-row justify-content-evenly form-component my-3">
                <label htmlFor="pricePrediction" className="form-label" style={{ margin: "auto", maxWidth: "200px" }}>
                    <p style={{ margin: "0" }}>Price Prediction</p>
                    <p style={{ margin: "0" }}>(at end of time horizon)</p>
                </label>
                <input onChange={handleChange} name="pricePrediction" type="text" className="form-control ms-5" style={{ maxWidth: "200px" }} />
            </div>
            <div className="d-flex flex-row justify-content-evenly form-component my-3">
                <label htmlFor="costBase" className="form-label" style={{ margin: "auto", maxWidth: "200px" }}>
                    <p style={{ margin: "0" }}>Initial Balance Cost Base</p>
                    <p style={{ margin: "0" }}>(in USD)</p>
                </label>
                <input onChange={handleChange} name="costBase" type="text" className="form-control ms-5" style={{ maxWidth: "200px" }} />
            </div>
            <div className="d-flex flex-row justify-content-evenly form-component my-3">
                <label htmlFor="stakeRate" className="form-label" style={{ margin: "auto", maxWidth: "200px" }}>
                    <p style={{ margin: "0" }}>Expected Interest Rate</p>
                    <p style={{ margin: "0" }}>(staking, lending, etc)</p>
                </label>
                <input onChange={handleChange} name="stakeRate" type="text" className="form-control ms-5" style={{ maxWidth: "200px" }} />
            </div>
            <button type="submit">submit</button>
        </form>
    </div>);
};

export default Form;