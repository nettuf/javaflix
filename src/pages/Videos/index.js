import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import repository from "../../Repository.js";
import ModalDialog from "../../components/Modal";
import config from "../../config.js";
import "./index.css"

function CadastroVideo() {
    const { register, handleSubmit, errors } = useForm();
    const [categorias, setCategorias] = useState([]);
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleNo = () => {
        setOpen(false);
        history.push('/ ');
    };
    const handleYes = () => {
        setOpen(false);
        document.getElementById("video-form").reset();
    };

    useEffect(() => {
        repository.getCategorias().then(async (categorias) => {
            await setCategorias(categorias);
        });
    }, []);

    function onSubmit(dados) {
        console.log("Dados:", dados);
        fetch(`${config.URL_BACKEND}/videos`, {
            method: "post",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...dados,
            categoriaId: Number(dados.categoriaId),
        }),
        })
        .then(function (response) {
            return response.json();
        })
        .then(() => {
            console.log("Cadastrou com sucesso!");
        })
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", JSON.stringify(response)))
        .then(handleClickOpen())
    }

    return (
        <div>
            <Header />

            <div className="container-fluid cadastro">
                <div className="text-center py-5 col-12">
                    <h1>Cadastro de Vídeos</h1>
                </div>
            
                <div className="col-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3 pb-5">
                    <form className="container" id="video-form" onSubmit={handleSubmit(onSubmit)}>

                        <input type="text" className="form-control input" id="titulo" placeholder="Título" autofocus name="titulo" ref={register({ required: "Preencha este campo." })}/>
                        <p>{errors.titulo?.message}</p>
                        <br />
                        <textarea type="text" className="form-control input" placeholder="Descrição" name="description" ref={register({ required: "Preencha este campo." })}/>
                        <p>{errors.description?.message}</p>
                        <br />
                        <input type="text" className="form-control input" placeholder="Youtube URL" name="url" ref={register({ required: "Preencha este campo." })}/>
                        <p>{errors.url?.message}</p>
                        <br />

                        <select className="form-control input" name="categoriaId" ref={register}>
                            {categorias.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {value.titulo}
                                </option>
                        ))}

                        </select>
                        <br />
                        <input type="submit" className="btn btn-dark btn-lg mr-4" value="Salvar"/>
                        <Link className="btn btn-secondary btn-lg mr-4" to="/categorias" role="button">Categorias</Link>
                        <Link className="btn btn-primary btn-lg" to="/" role="button">Home</Link>
                    </form>

                </div>

            </div>

            <ModalDialog
                open = {open}
                handleClose = {handleNo}
                titulo = 'Cadastrado com sucesso'
                texto = 'Deseja fazer outro cadastro?'
                handleSim = {handleYes}
                handleNao = {handleNo}
            />

            <Footer />
        </div>
    );
    }

export default CadastroVideo;