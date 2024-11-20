import {addCompleted, deleteTodo} from "./localStorage.js";

export function TodoBox({taskName,date,id, updateList, flag}) {
    return (
        <div className={'todoBox'}>
            <div style={{maxWidth: "55%"}}>
                <h3 style={{paddingLeft: 15, overflowWrap: "break-word", scrollbarWidth: "none"}}>{taskName}</h3>
            </div>

            <div className={'Div2'} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15
            }}>
                <p>{date}</p>
                {flag ?
                    <svg onClick={()=> {addCompleted(id); updateList(); }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 11l3 3l8 -8"/>
                        <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"/>
                        <title>Done</title>
                    </svg>
                    : ""
                }
                <svg onClick={()=> {deleteTodo(id);updateList();}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 7l16 0"/>
                    <path d="M10 11l0 6"/>
                    <path d="M14 11l0 6"/>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                    <title>Delete</title>
                </svg>
            </div>
        </div>
    )
}

