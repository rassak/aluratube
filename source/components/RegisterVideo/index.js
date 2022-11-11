import React from "react";
import { StyledRegisterVideo } from "./styles";

// Custom hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange : (e) => {
            console.log(e.target);
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

export default function RegisterVideo() {

    const formCadastro = useForm({
        initialValues: {titulo: "Frost punk", url: "https://youtube.."}
    });
    const [formVisivel, setFormVisivel] = React.useState(true);

    /*
        ## O que precisamos para o form funcionar?
        - pegar os dados vindo do state
            - titulo
            - url do video
        - Precisamos ter o onSubmit do nosso form
        - limpar o formulário apos o submit
        - fechar a tela
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário (if) */}
            {/* Operadores de Curto-circuito */}
            { formVisivel 
                ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(formCadastro.values);
                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input 
                                placeholder="Titulo do vídeo" 
                                name="titulo"
                                value={formCadastro.values.titulo} 
                                onChange={formCadastro.handleChange}
                            />
                            <input 
                                placeholder="URL" 
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                                
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false
            }
        </StyledRegisterVideo>
    )
}


// falta o botão para adicionar - OK
// Modal - OK
// -> Precisamos controlar o state - OK
// -> Formulário em si