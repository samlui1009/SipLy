import { useState, useEffect } from 'react';
import './MainMenu.css';

function MainMenu() {

    const [user, setUser] = useState(null);
    // User State variable 
    const [dailyLog, setDailyLog] = useState([]);
    // This will be an array that currently stores nothing as it is new
    const [form, setForm] = useState({
        name:"",
        calories:"",
        sugar:"",
        caffeine:""
    });
    // States for what we're using

    useEffect(() => {
        fetch('http://localhost:8080/api/beverage-log/get-all-beverages/1')
         .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch beverages");
            return res.json();
         })
         .then((data) => {
            setDailyLog(data);
         })
         .catch(() => console.error("Error in loading all beverages"));
        },[]);
        // Dependency array => Only runs this ONCE

    const addWater = (e) => {
        e.preventDefault();
        const water ={
            name: "Water",
            calories: 0, 
            sugar: 0,
            caffeine: 0
        }
        // Default behaviour for now
        fetch('http://localhost:8080/api/beverage-log/add-beverage/1', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(water),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add water");
            }
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
        })
        .catch((err) => {
            console.error("Error adding water", err);
        });
    };

    const addCoffee = (e) => {
        e.preventDefault();
        const coffee = {
            name: "Coffee",
            calories: 1,
            sugar: 0,
            caffeine: 94.8
        }
        fetch('http://localhost:8080/api/beverage-log/add-beverage/1', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(coffee),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add coffee");
            }
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
        })
        .catch((err) => {
            console.error("Error adding coffee", err);
        });
    };

    const addTea = (e) => {
        e.preventDefault();
        const tea = {
            name: "Tea",
            calories: 2,
            sugar: 0,
            caffeine: 47
        }
        fetch('http://localhost:8080/api/beverage-log/add-beverage/1', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(tea),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add tea");
            }
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
        })
        .catch((err) => {
            console.error("Error adding tea", err);
        });
    }

    const addMilk = (e) => {
        e.preventDefault();
        const milk = {
            name: "Milk",
            calories: 125,
            sugar: 12,
            caffeine: 0
        }
        fetch('http://localhost:8080/api/beverage-log/add-beverage/1', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(milk),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add milk");
            }
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
        })
        .catch((err) => {
            console.error("Error adding milk", err);
        });
    }

    const addJuice = (e) => {
        e.preventDefault();
        const juice = {
            name: "Juice",
            calories: 120,
            sugar: 23,
            caffeine: 0
        }
        fetch('http://localhost:8080/api/beverage-log/add-beverage/1', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(juice),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add juice");
            }
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
        })
        .catch((err) => {
            console.error("Error adding juice", err);
        });
    }

    const addPop = (e) => {
        e.preventDefault();
        const pop = {
            name: "Pop",
            calories: 140,
            sugar: 39,
            caffeine: 34
        }
        fetch('http://localhost:8080/api/beverage-log/add-beverage/1', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(pop),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add pop");
            }
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
        })
        .catch((err) => {
            console.error("Error adding pop", err);
        });
    }

    const handleCustomBeverageSubmission = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/beverage-log/add-beverage/1', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(form),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add this beverage");
            }
            return res.json();
        })
        .then((data) => {
            setDailyLog(data);
            setForm({
                name:"",
                calories:"",
                sugar:"",
                caffeine:""
            })
        })
    }

    return(
        <div className = "main-menu">
            <h1 className="title">☕︎ Record Beverages</h1>
            <h4 className="quick-add-title">Quick Add (250mL)</h4>
            <div className = "quick-add">
                <button className="water" onClick={addWater}>💧 Water</button>
                <button className="coffee" onClick={addCoffee}>☕ Coffee</button>
                <button className="tea" onClick={addTea}>🍵 Tea</button>
                <button className="milk" onClick={addMilk}>🥛 Dairy Milk</button>
                <button className="juice" onClick={addJuice}>🧃 Fruit Juices</button>
                <button className="pop" onClick={addPop}>🥤 Soft Drinks</button>
            </div>
            <div className = "customize-drink">
                <h4>Customize Your Beverage</h4>
                <form className="bev-form" onSubmit={handleCustomBeverageSubmission}>
                    <label for="bevName">Beverage Name:</label>
                    <input type="text"
                           value={form.name}
                           onChange={(e) => setForm({ ...form, name: e.target.value})}></input>
                    <label for="calories">Calories:</label>
                    <input type="text"
                           value={form.calories}
                           onChange={(e) => setForm({ ...form, calories: e.target.value})}></input>
                    <label for="sugar">Sugar:</label>
                    <input type="text"
                           value={form.sugar}
                           onChange={(e) => setForm({ ...form, sugar: e.target.value})}></input>
                    <label for="caffeine">Caffeine:</label>
                    <input type="text"
                           value={form.caffeine}
                           onChange={(e) => setForm({ ...form, caffeine: e.target.value})}></input>
                    <input type="submit" className="submit-button" onClick={handleCustomBeverageSubmission}></input>
                </form>
            </div>
        </div>
    );
}

export default MainMenu