import { useEffect, useState } from "react";

export default function GroceryList() {

    const [groceries, setGroceries] = useState(() => {
        return JSON.parse(localStorage.getItem('lists')) || []
    });
    const [newItem, setNewItem] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(groceries))
    }, [groceries])


    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('lists'))
        if (list) {
            setGroceries(list)
        }
    }, [groceries])

    const handleAddItem = () => {
        if (newItem.trim() !== "") {
            setGroceries([...groceries, { text: newItem.trim(), checked: false }]);
            setNewItem("");
            setButtonPopup(true);
            setMessage("Item added to the list");
        } else {
            setButtonPopup(true);
            setMessage("Please provide value");
        }
    };

    const handleDeleteItem = (index) => {
        const newGroceries = [...groceries];
        newGroceries.splice(index, 1);
        setGroceries(newGroceries);
        setButtonPopup(true);
        setMessage("Deleted a grocery item");
    };

    const handleToggleItem = (index) => {
        const newGroceries = [...groceries];
        newGroceries[index].checked = !newGroceries[index].checked;
        setGroceries(newGroceries);
    };





    return (
        <div className="Wrapper">

            {buttonPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>{message}</h2>
                        <button className="close-btn" onClick={() => setButtonPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="groceryList ">
                <h1>Grocery List</h1>

                <div className="textfield">
                    <input
                        className="text-input"
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                    />
                    <button onClick={handleAddItem} className="add-btn">
                        Add Item
                    </button>
                </div>


                <ul>
                    {groceries.map((item, index) => (
                        <li key={index}>
                            <div className="item-check">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleToggleItem(index)}
                                    className="checkbox"
                                />
                                <span
                                    style={{
                                        textDecoration: item.checked ? "line-through" : "none"
                                    }}
                                    className="item-name"
                                >
                                    {item.text}
                                </span>
                            </div>


                            <button
                                onClick={() => handleDeleteItem(index)}
                                className="delete-btn"
                            >
                                Delete
                            </button>


                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
