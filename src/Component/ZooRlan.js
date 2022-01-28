import {useReducer} from "react";
import {useForm} from "react-hook-form";

import "./ZooPlan.css"

const zooState = {
    cats: [],
    dogs: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'addCat':
            const Cat = state.cats[state.cats.length - 1]?.id ?? 0;

            return {
                ...state,
                cats: [
                    ...state.cats,
                    {name: action.payload.name, id: Cat + 1}
                ]
            };

        case 'addDog':
            const Dog = state.dogs[state.cats.length - 1]?.id ?? 0;

            return {
                ...state,
                dogs: [
                    ...state.dogs,
                    {name: action.payload.name, id: Dog + 1}
                ]
            };

        case 'saveCat':
            const saveCatId = action.payload.catId;

            return {
                ...state,
                cats: state.cats.filter(cat => cat.id !== saveCatId)
            };

        case 'saveDog':
            const saveDogId = action.payload.dogId;

            return {
                ...state,
                dogs: state.dogs.filter(dog => dog.id !== saveDogId)
            };

        default:
            throw new Error('MyError');
    }
};
export default function ZooPlan() {
    const [planState, dispatch] = useReducer(reducer, zooState);
    const {register, handleSubmit, reset} = useForm();

    const {register: register2, handleSubmit: handleSubmit2, reset: reset2} = useForm();

    const zooAddCat = (data) => {
        dispatch({type: 'addCat', payload: {name: data.catName}});
        reset(data);
    };

    const zooAddDog = (data) => {
        dispatch({type: 'addDog', payload: {name: data.dogName}});
        reset2(data);
    };

    const saveCat = (catId) => {
        dispatch({type: 'saveCat', payload: {catId}});
    };

    const saveDog = (dogId) => {
        dispatch({type: 'saveDog', payload: {dogId}});
    };

    return (
        <div className="zoo">
            <div className="Cat">
                <form onSubmit={handleSubmit(zooAddCat)}>
                    <label> Add cat:<input {...register("catName")} placeholder="Enter tte name of the cat"/>
                        <button>Save</button>
                    </label>
                </form>
                {planState.cats.map(cat => (<div key={cat.id}>{cat.name}
                        <button onClick={() => saveCat(cat.id)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="Dog">
                <form onSubmit={handleSubmit2(zooAddDog)}>
                    <label> Add dog:<input {...register2("dogName")} placeholder="Enter tte name of the dog"/>
                        <button>Save</button>
                    </label>
                </form>
                {planState.dogs.map(dog => (<div key={dog.id}>{dog.name}
                        <button onClick={() => saveDog(dog.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};






