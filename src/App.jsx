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

    let [searchingElement, setSearchingElement] = useState(<></>);

    let searchRef=useRef(null);

    useEffect(() => {
        function showUpcoming(){
            setupcomingFlag(true);
            let x=giveStoredList();
            localStorage.setItem("clickedFlag",JSON.stringify(true));
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
            localStorage.setItem("clickedFlag",JSON.stringify(false));
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
            searchRef.current.value='';
            setSearchingElement(<></>);
            showUpcoming();
        });

        completedRef.current.addEventListener('click', (e) => {
            e.target.classList.add("selected");
            upcomingRef.current.classList.remove("selected");
            searchRef.current.value='';
            setSearchingElement(<></>);
            showCompleted();
        })

        upcomingRef.current.click();

        searchRef.current.addEventListener('input', (e) => {
            e.target.textContent = searchRef.current.value;

            setSearchingElement(<h5 style={{color: "dimgray", fontFamily: "Poppins, sans-serif", marginTop: "-15px", marginBottom: "15px"}}>Searching...</h5>);
            if(searchRef.current.value===''){
                setSearchingElement(<></>);
            }

            let txt = e.target.textContent;
            let x = giveStoredList();
            let tempArr = [];
            let upcomingFlag=JSON.parse(localStorage.getItem("clickedFlag"));
            if(upcomingFlag){
                for(let i=0;i<x.length;i++) {
                    if (x[i].stat === 'upcoming' && x[i].name.toLowerCase().startsWith(txt.toLowerCase())) {
                        tempArr = [...tempArr,x[i]];
                    }
                }
            }
            else{
                for(let i=0;i<x.length;i++) {
                    if (x[i].stat === 'completed' && x[i].name.toLowerCase().startsWith(txt.toLowerCase())) {
                        tempArr = [...tempArr,x[i]];
                    }
                }
            }
            setTodoList(tempArr);
        })
    }, []);

    useEffect(()=>{
        setTodoListElements([]);
        for(let i=0;i<TodoList.length;i++){
            setTodoListElements(TodoListElements=>[...TodoListElements,<TodoBox key={i} taskName={TodoList[i].name} date={TodoList[i].date} id={TodoList[i].id} updateList={()=> {upcomingFlag? upcomingRef.current.click(): completedRef.current.click() }} flag={upcomingFlag}></TodoBox>]);
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
                    <form className={'searchBar'} onSubmit={(e)=>{e.preventDefault();}}>
                        <input id={'searchBar'} type={'text'} placeholder={'Search your task'} ref={searchRef}></input>
                        <button type={'submit'} className={'searchButton'}>
                            <SearchIcon></SearchIcon>
                        </button>
                    </form>
                    <div className='top-subgroup'>
                        <button className={'plusSpan'} onClick={() => {
                            setPopupVisible(true);
                            upcomingRef.current.click();
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
                    {searchingElement}
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
