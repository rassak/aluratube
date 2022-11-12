import { createClient } from "@supabase/supabase-js";
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

const PROJECT_URL = "https://wzptpxksnwoordxbwtwc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cHRweGtzbndvb3JkeGJ3dHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTMwMDMsImV4cCI6MTk4Mzc4OTAwM30._BIAr59zrKrtoyv5MViE6RL3OjXRLlygByE-3L3NClk";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {

    const formCadastro = useForm({
        initialValues: {titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

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

                        // contrato entre o nosso Front e backend
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        })

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