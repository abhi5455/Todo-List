import './App.css'
import './todo.css'
import './popup.css'
import './resize.css'
import {useEffect, useRef, useState} from "react";
import {SearchIcon} from "./searchIcon.jsx";
import {TodoBox} from "./todoBox.jsx";
import {AddPopup} from "./popup.jsx";
import {giveStoredList} from "./localStorage.js";
import {HandleEmptyList} from "./noTaskHandler.jsx";


function App() {
    let [popupVisible, setPopupVisible] = useState(false);
    let [TodoList, setTodoList] = useState([]);
    let [TodoListElements, setTodoListElements] = useState([]);
    let [upcomingFlag, setupcomingFlag] = useState(true);
    let upcomingRef = useRef(null);
    let completedRef=useRef(null);

    useEffect(() => {
        function showUpcoming(){
            setupcomingFlag(true);
            let x=giveStoredList();
            setTodoList([]);
            for(let i=0;i<x.length;i++){
                if(x[i].stat==='upcoming') {
                    setTodoList(TodoList=>[...TodoList, x[i]]);
                }
            }
        }

        function showCompleted(){
            setupcomingFlag(false);
            let x=giveStoredList();
            setTodoList([]);
            for(let i=0;i<x.length;i++){
                if(x[i].stat==='completed') {
                    setTodoList(TodoList=>[...TodoList, x[i]]);
                }
            }
        }

        upcomingRef.current.addEventListener('click', (e) => {
            e.target.classList.add("selected");
            completedRef.current.classList.remove("selected");
            showUpcoming();
        });

        completedRef.current.addEventListener('click', (e) => {
            e.target.classList.add("selected");
            upcomingRef.current.classList.remove("selected");
            showCompleted();
        })

        upcomingRef.current.click();

    }, []);

    useEffect(()=>{
        setTodoListElements([]);
        for(let i=0;i<TodoList.length;i++){
            setTodoListElements(TodoListElements=>[...TodoListElements,<TodoBox key={i} taskName={TodoList[i].name} date={TodoList[i].date} id={TodoList[i].id} updateList={()=> upcomingRef.current.click() } flag={upcomingFlag}></TodoBox>]);
        }
        if(TodoList.length===0){
            setTodoListElements([<HandleEmptyList key={-1}></HandleEmptyList>]);
        }
    },[TodoList])


    return (
        <>
            <header className='header'>
                <img alt={'logo'} src={'todoIcon.png'} id={'logoIcon'} ></img>
            </header>
            <main className='main'>
                <div className='top-group'>
                    <form className={'searchBar'}>
                        <input id={'searchBar'} type={'text'} placeholder={'Search your task'}></input>
                        <button type={'submit'} className={'searchButton'}>
                            <SearchIcon></SearchIcon>
                        </button>
                    </form>
                    <div className='top-subgroup'>
                        <button className={'plusSpan'} onClick={() => {
                            setPopupVisible(true);
                        }} style={{
                            backgroundColor: "#013141",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: 'center',
                            width: "42px",
                            borderRadius: "10px",
                            border: "none"
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="icon-tabler icons-tabler-outline icon-tabler-plus">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 5l0 14"/>
                                <path d="M5 12l14 0"/>
                            </svg>
                        </button>
                        <button id={'upcomingButton'} className={'button'} ref={upcomingRef}>Upcoming</button>
                        <button id={'completedButton'} className={'button'} ref={completedRef}>Completed</button>
                    </div>
                </div>
                <div id={'showcase'}>
                    {TodoListElements}
                </div>
                {
                    popupVisible ? <AddPopup cancelPopup={() => {
                        setPopupVisible(false);
                    }} updateList={()=>
                        upcomingRef.current.click()
                    }/> : ""
                }
            </main>
        </>
    )
}

export default App
