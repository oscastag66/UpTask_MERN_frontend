import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import useProyectos from "../hooks/useProyectos"
import Proyecto from "../paginas/Proyecto"
import Alerta from "./Alerta"

const FormularioProyecto = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [fechaEntrega, setFechaEntrega] = useState("")
    const [cliente, setCliente] = useState("")
    const params = useParams()
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()
    
    useEffect( () => {
        //console.log(params)
        if (params.id ) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setCliente(proyecto.cliente)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
        } else {
            console.log('Creando')
        }
    }, [params])
    
    //console.log(params)

    const handleSubmit = async e => {
        e.preventDefault();
        if ( [nombre, descripcion, fechaEntrega, cliente].includes('') ) {
            mostrarAlerta({
                msg: "Es necesario llenar todos los campos",
                error: true 
            })
            return
        }
        // pasar los datos hacia el provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
        // termino de grabar registro y resetea formulario
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }  
    
    const { msg } = alerta

    return (
        <form 
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"        
                    >Nombre Proyecto
                </label>   
                <input 
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>     
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"        
                    >Descripcion
                </label>   
                <textarea 
                    id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del Proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>    
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-entrega"        
                    >Fecha Entrega
                </label>   
                <input 
                    id="fecha-entrega"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Fecha de Entrega"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div> 
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente"        
                    >Nombre del Cliente
                </label>   
                <input 
                    id="cliente"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div> 
            <input 
                type="submit"
                value={id ? 'Actualizar Proyecto' : 'Crear Proyecto' } 
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormularioProyecto


