import {addToStack} from "./localStorage.js";
import {useState} from "react";

export function AddPopup({cancelPopup,updateList}) {
    let [task, setTask] = useState("");
    let [date, setDate] = useState("");

    return <>
        <div className="blackBox">
            <form>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <label>Task:</label>
                    <input id={"task"} placeholder={"Enter Task"} value={task} onChange={(e) => {
                        setTask(e.target.value)
                    }} required></input>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <label>Target Date:</label>
                    <input type={"date"} required value={date} onChange={(e) => {
                        setDate(e.target.value)
                    }}></input>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly', width: '300px'}}>
                    <button type={"reset"} onClick={cancelPopup}>CANCEL</button>
                    <button type={"submit"} onClick={
                        () => {
                            if(task!=="" && date!=="") {
                                addToStack(task, date);
                                updateList();
                            }

                        }}>ADD
                    </button>
                </div>
            </form>
        </div>
    </>
}