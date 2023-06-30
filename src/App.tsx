import Amis from "./Amis"
import React from "react";
import {ToastComponent, AlertComponent, Spinner} from 'amis';
function App() {

    return <div className="app-wrapper">
        <ToastComponent key="toast" position={'top-right'}/>
        <AlertComponent key="alert"/>
        <React.Suspense
            fallback={<Spinner overlay className="m-t-lg" size="lg"/>}
        >
            <Amis/>
        </React.Suspense>
    </div>
}
export default App
