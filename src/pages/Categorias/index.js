import React, {useState, useEffect} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ModalDialog from "../../components/Modal";
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import config from "../../config.js";
import './index.css' 

function CadastroCategoria() {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleNo = () => {
        setOpen(false);
        history.push('/ ');
    };
    const handleYes = () => {
        setOpen(false);
        document.getElementById("categoria-form").reset();
    };

    function onSubmit(dados) {
        fetch(`${config.URL_BACKEND}/categorias`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        })
        .then(function (response) {
            return response.json();
        })
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", JSON.stringify(response)))
        .then(handleClickOpen())
        }
        return (
            <div>
                <Header />
                <div className="container-fluid cadastro">
                    <div className="row">
                        <div className="text-center py-5 col-12">
                            <h1>Cadastro de Categoria</h1>
                        </div>
                        
                        <div className="col-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3 pb-5">
                            <form id="categoria-form" onSubmit={handleSubmit(onSubmit)} className="form-group">
                                <input type="text" className="form-control input" placeholder="Título" name="titulo" ref={register({required: true})} />
                                <br />
                                <input type="text" className="form-control input" placeholder="Descrição Extra" name="descricao" ref={register({required: true})} />
                                <br />
                                <input type="text" className="form-control input" placeholder="Link Extra" name="url" ref={register({required: true})} />
                                <br />
                                <input type="color" className="form-control input" placeholder="Cor" name="cor" ref={register({required: true})} />
                                <br />
                                <input type="submit" className="btn btn-dark btn-lg mr-4" value="Salvar"/>
                                <Link className="btn btn-secondary btn-lg mr-4" to="/videos" role="button">Videos</Link>
                                <Link className="btn btn-primary btn-lg" to="/" role="button">Home</Link>
                            </form>
                        </div>
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
        )
    };
export default CadastroCategoria;