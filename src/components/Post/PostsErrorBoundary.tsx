/*
Error Boundaries, concepto para manejar errores de forma elegante.
Son componentes de react que capturan errores de su componete hijo.
Debemos saber que este componte envuelve un hijo, como si fuera un Provider.
Registran esos errores y muestran una UI de respaldo.
*/

import React from "react";
import { ErrorAlert } from "../ErrorAlert";


export class HandlerErrorBoundary extends React.Component<
{children: React.ReactNode},
{hasError: boolean; error?: Error}
>{
    constructor(props:{children:React.ReactNode}){
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error:Error){
        return {hasError: true, error}// Actualiza el estado para mostrar la UI de respaldo
    }

    render(): React.ReactNode {
        if(this.state.hasError){
            return <ErrorAlert error={this.state.error} />
        }
        return this.props.children
    }
}