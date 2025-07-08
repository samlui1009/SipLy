import './MainMenu.css';

function MainMenu() {
    return(
        <div className = "main-menu">
            <h1 className="title">☕︎ Record Beverages</h1>
            <h4 className="quick-add-title">Quick Add</h4>
            <div className = "quick-add">
                <button className="water">💧 Water</button>
                <button className="coffee">☕ Coffee</button>
                <button className="tea">🍵 Tea</button>
                <button className="milk">🥛 Dairy Milk</button>
                <button className="juice">🧃 Fruit Juices</button>
                <button className="pop">🥤 Soft Drinks</button>
            </div>
            <div className = "customize-drink">
                <h4>Customize Your Beverage</h4>
                <form className="bev-form">
                    <label for="bevName">Beverage Name:</label>
                    <input type="text"></input>
                    <label for="calories">Calories:</label>
                    <input type="text"></input>
                    <label for="sugar">Sugar:</label>
                    <input type="text"></input>
                    <label for="caffeine">Caffeine:</label>
                    <input type="text"></input>
                    <input type="submit" className="submit-button"></input>
                </form>
            </div>
        </div>
    );
}

export default MainMenu