import './IndividualBeverage.css';
import { MdDeleteForever } from 'react-icons/md';

function IndividualBeverage({ id, name, cals, sug, caffe, onDelete }) {

    return(
        <div className="individual-beverage-container">
            <div className="top-component">
                <p className="bev-name">{ name }</p>
                <button className="delete-button" onClick={() => onDelete(id)}><MdDeleteForever></MdDeleteForever></button>
            </div>
                <li className="bev-parameters-list-single">Calories: { cals }</li>
                <li className="bev-parameters-list-single">Sugar: { sug }</li>
                <li className="bev-parameters-list-single">Caffeine: { caffe }</li>
        </div>
    );
}

export default IndividualBeverage